/**
 * @module crm/timeline/scheduler/providers/activity
 */
jn.define('crm/timeline/scheduler/providers/activity', (require, exports, module) => {
	include('InAppNotifier');

	const { Loc } = require('loc');
	const { Haptics } = require('haptics');
	const { TimelineSchedulerBaseProvider } = require('crm/timeline/scheduler/providers/base');
	const { ResponsibleSelector } = require('crm/timeline/services/responsible-selector');
	const { Toolbar, ToolbarIcon, ToolbarButton } = require('crm/timeline/ui/toolbar');
	const { WidgetHeaderButton } = require('layout/ui/widget-header-button');
	const { Textarea } = require('crm/timeline/ui/textarea');
	const { FileField } = require('layout/ui/fields/file');
	const { Moment } = require('utils/date');
	const { datetime, shortTime, dayMonth, longDate } = require('utils/date/formats');
	const { WorkTimeMoment } = require('crm/work-time');
	const { get } = require('utils/object');
	const { withCurrentDomain } = require('utils/url');

	const DEFAULT_AVATAR = '/bitrix/mobileapp/crmmobile/extensions/crm/timeline/item/ui/user-avatar/default-avatar.png';
	const DEFAULT_SELECTOR_AVATAR = '/bitrix/mobileapp/mobile/extensions/bitrix/selector/providers/common/images/user.png';

	const INITIAL_HEIGHT = 1000;

	const isAndroid = Application.getPlatform() === 'android';

	/**
	 * @class TimelineSchedulerActivityProvider
	 */
	class TimelineSchedulerActivityProvider extends TimelineSchedulerBaseProvider
	{
		constructor(props)
		{
			super(props);

			this.state = {
				deadline: null,
				text: this.getInitialText(),
				files: [],
				user: props.user,
				maxHeight: INITIAL_HEIGHT,
			};

			this.mounted = false;

			this.initDeadline();

			this.textInputRef = null;

			/** @type {FileField|null} */
			this.fileFieldRef = null;

			this.saveButton = new WidgetHeaderButton({
				widget: this.layout,
				text: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_SAVE'),
				loadingText: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_SAVE_PROGRESS'),
				disabled: !this.isSaveAllowed(),
				onClick: () => this.save(),
			});

			/** @type {ToolbarButton|null} */
			this.createButtonRef = null;

			this.openResponsibleUserSelector = this.openResponsibleUserSelector.bind(this);
			this.updateResponsibleUser = this.updateResponsibleUser.bind(this);
		}

		componentDidMount()
		{
			super.componentDidMount();

			this.mounted = true;

			this.focus();
		}

		static getId()
		{
			return 'activity';
		}

		static getTitle()
		{
			return Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_TITLE');
		}

		static getMenuTitle()
		{
			return Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_MENU_FULL_TITLE');
		}

		static getMenuShortTitle()
		{
			return Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_MENU_TITLE');
		}

		static getMenuIcon()
		{
			return '<svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 5.5C9.47715 5.5 5 9.97715 5 15.5C5 21.0228 9.47715 25.5 15 25.5C20.5228 25.5 25 21.0228 25 15.5C25 9.97715 20.5228 5.5 15 5.5ZM11.6346 14.4874L13.8697 16.7226L19.228 11.3643L20.8081 12.9444L13.8713 19.8812L13.7853 19.7952L13.7838 19.7968L10.0545 16.0675L11.6346 14.4874Z" fill="#767C87"/></svg>';
		}

		static getMenuPosition()
		{
			return 100;
		}

		/**
		 * @return {object}
		 */
		static getBackdropParams()
		{
			return {
				showOnTop: false,
				onlyMediumPosition: true,
				mediumPositionPercent: 80,
			};
		}

		static isSupported()
		{
			return true;
		}

		initDeadline()
		{
			const { scheduleTs } = this.context;
			let deadline;
			if (scheduleTs)
			{
				deadline = Moment.createFromTimestamp(scheduleTs);
			}
			else
			{
				const workTimeMoment = new WorkTimeMoment();
				deadline = workTimeMoment.getNextWorkingDay(3).moment;
				deadline = deadline.addHours(1).startOfHour();
			}

			this.setState({ deadline });
		}

		getInitialText()
		{
			return '';
		}

		hasUploadingFiles()
		{
			if (!this.fileFieldRef)
			{
				return false;
			}

			return this.fileFieldRef.hasUploadingFiles();
		}

		render()
		{
			return View(
				{
					style: {
						flexDirection: 'column',
						flex: 1,
						backgroundColor: '#eef2f4',
					},
					resizableByKeyboard: true,
				},
				View(
					{
						style: {
							flex: 1,
							backgroundColor: '#ffffff',
							borderTopLeftRadius: 12,
							borderTopRightRadius: 12,
							maxHeight: this.state.maxHeight,
						},
						onLayout: ({ height }) => this.setMaxHeight(height),
					},
					this.renderTextField(),
					this.renderAttachments(),
					this.renderDeadlineAndResponsible(),
				),
				// this.renderToolbar(),
			);
		}

		setMaxHeight(height)
		{
			const { maxHeight } = this.state;
			const newMaxHeight = Math.ceil(Math.min(height, maxHeight));

			if (newMaxHeight < maxHeight)
			{
				this.setState({ maxHeight: newMaxHeight });
			}
		}

		renderTextField()
		{
			const isIOS = Application.getPlatform() === 'ios';

			return View(
				{
					style: {
						flex: 1,
						paddingLeft: isIOS ? 8 : 0,
					},
				},
				Textarea({
					testId: 'TimelineProviderActivityTextarea',
					ref: (ref) => this.textInputRef = ref,
					text: this.state.text,
					placeholder: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_PLACEHOLDER'),
					onChange: (text) => {
						this.state.text = text;
						this.refreshSaveButton();
					},
				}),
			);
		}

		renderAttachments()
		{
			return View(
				{
					style: {
						paddingHorizontal: isAndroid ? 16 : 12,
						display: this.state.files.length === 0 ? 'none' : 'flex',
						paddingBottom: 12,
					},
				},
				FileField({
					testId: 'TimelineProviderActivityFileField',
					ref: (ref) => this.fileFieldRef = ref,
					showTitle: false,
					showAddButton: false,
					multiple: true,
					value: [],
					config: {
						fileInfo: {},
						mediaType: 'file',
						parentWidget: this.layout,
						controller: {
							endpoint: 'crm.FileUploader.TodoActivityUploaderController',
							options: {
								entityTypeId: this.entity.typeId,
								entityId: this.entity.id,
								activityId: null,
							},
						},
					},
					readOnly: false,
					onChange: (files) => {
						files = Array.isArray(files) ? files : [];
						this.setState({ files }, () => this.refreshSaveButton());
					},
				}),
			);
		}

		renderDeadlineAndResponsible()
		{
			const { deadline, user } = this.state;

			// prevent bottom blink because of slow android keyboard focusing
			if (!this.mounted && isAndroid)
			{
				return null;
			}

			if (!deadline)
			{
				return null;
			}

			const textParts = [];
			const weekDay = env.languageId === 'ru'
				? deadline.format('EE').toLocaleLowerCase(env.languageId)
				: deadline.format('EE');

			if (deadline.isToday)
			{
				textParts.push(
					Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_TODAY').toLocaleLowerCase(env.languageId),
				);
			}
			else if (deadline.isTomorrow)
			{
				textParts.push(
					Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_TOMORROW').toLocaleLowerCase(env.languageId),
				);
			}
			else if (deadline.inThisYear)
			{
				textParts.push(`${weekDay}, ${deadline.format(dayMonth)}`);
			}
			else
			{
				textParts.push(`${weekDay}, ${deadline.format(longDate)}`);
			}

			textParts.push(
				deadline.format(shortTime).toLocaleLowerCase(env.languageId),
			);

			return View(
				{
					style: {
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: isAndroid ? 16 : 12,
						paddingBottom: 14,
					},
				},
				View(
					{
						style: {
							flexDirection: 'row',
						},
					},
					View(
						{
							style: {
								paddingTop: 2,
							},
						},
						Image({
							svg: {
								content: '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8353 11.5613H14.0231C14.2624 11.5613 14.4563 11.7552 14.4563 11.9945V13.1823C14.4563 13.4215 14.2624 13.6154 14.0231 13.6154H12.8353C12.5961 13.6154 12.4022 13.4215 12.4022 13.1823V11.9945C12.4022 11.7552 12.5961 11.5613 12.8353 11.5613Z" fill="#a8adb4"/><path d="M10.9428 11.5615H9.75504C9.5158 11.5615 9.32187 11.7555 9.32187 11.9947V13.1825C9.32187 13.4217 9.5158 13.6157 9.75504 13.6157H10.9428C11.1821 13.6157 11.376 13.4217 11.376 13.1825V11.9947C11.376 11.7555 11.1821 11.5615 10.9428 11.5615Z" fill="#a8adb4"/><path d="M10.9418 14.6425H9.75404C9.5148 14.6425 9.32087 14.8365 9.32087 15.0757V16.2635C9.32087 16.5027 9.5148 16.6967 9.75404 16.6967H10.9418C11.1811 16.6967 11.375 16.5027 11.375 16.2635V15.0757C11.375 14.8365 11.1811 14.6425 10.9418 14.6425Z" fill="#a8adb4"/><path d="M14.0231 14.6425H12.8353C12.5961 14.6425 12.4022 14.8365 12.4022 15.0757V16.2635C12.4022 16.5027 12.5961 16.6967 12.8353 16.6967H14.0231C14.2624 16.6967 14.4563 16.5027 14.4563 16.2635V15.0757C14.4563 14.8365 14.2624 14.6425 14.0231 14.6425Z" fill="#a8adb4"/><path d="M15.9166 11.5613H17.1044C17.3436 11.5613 17.5376 11.7552 17.5376 11.9945V13.1823C17.5376 13.4215 17.3436 13.6154 17.1044 13.6154H15.9166C15.6774 13.6154 15.4834 13.4215 15.4834 13.1823V11.9945C15.4834 11.7552 15.6774 11.5613 15.9166 11.5613Z" fill="#a8adb4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.2927 6.63928V6.07315H19.5435C20.6858 6.14562 21.5707 7.14313 21.5501 8.33764V19.6601C21.5501 20.2851 21.0647 20.7923 20.4643 20.7923H6.29025C5.69089 20.7923 5.20445 20.2851 5.20445 19.6601V8.33764C5.20011 8.27877 5.19794 8.22102 5.19794 8.16328C5.20011 7.00612 6.10132 6.07089 7.211 6.07315H8.46184V6.63928C8.46184 7.57678 9.1904 8.33764 10.0905 8.33764C10.9906 8.33764 11.7192 7.57678 11.7192 6.63928V6.07315H15.0353V6.63928C15.0353 7.57678 15.765 8.33764 16.664 8.33764C17.5631 8.33764 18.2927 7.57678 18.2927 6.63928ZM19.3785 18.5278H7.37607V9.53409H19.3785V18.5278Z" fill="#a8adb4"/><path d="M10.8885 5.16961V6.41508C10.8885 6.87477 10.5313 7.24728 10.0904 7.24728C9.64958 7.24728 9.29236 6.87477 9.29236 6.41508V5.16961L9.29821 5.06148C9.34644 4.64874 9.6865 4.32964 10.0958 4.33174C10.5367 4.33514 10.8906 4.70992 10.8885 5.16961Z" fill="#a8adb4"/><path d="M17.4176 5.20015V6.38109C17.4176 6.81473 17.0799 7.16686 16.663 7.16686C16.246 7.16573 15.9105 6.8136 15.9105 6.37995V5.20015C15.9105 4.76537 16.2482 4.41437 16.6641 4.41437C17.0799 4.41437 17.4176 4.76537 17.4176 5.20015Z" fill="#a8adb4"/></svg>',
							},
							style: {
								width: 26,
								height: 26,
								alignSelf: 'center',
							},
						}),
					),
					View(
						{
							testId: 'TimelineProviderActivityDeadline',
							style: {
								flexDirection: 'column',
								justifyContent: 'center',
								marginLeft: 8,
							},
							onClick: () => {
								this.openDatePicker();
							},
						},
						Text({
							text: textParts.join(', '),
							style: {
								color: '#828b95',
								fontSize: 15,
							},
						}),
						View(
							{
								style: {
									borderBottomWidth: 1,
									borderBottomColor: '#c9ccd0',
									borderStyle: 'dash',
									borderDashSegmentLength: 2,
									borderDashGapLength: 3,
								},
							},
						),
					),
				),
				View(
					{
						style: {
							flexDirection: 'row',
						},
					},
					this.renderAttachButton(),
					this.renderMenuButton(),
					user && this.renderVerticalSeparator(),
					this.renderResponsibleButton(),
				),
			);
		}

		renderMenuButton()
		{
			return null;
		}

		renderAttachButton()
		{
			return View(
				{
					style: {
						alignSelf: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: 8,
						paddingVertical: 4,
					},
					testId: 'TimelineProviderActivityAttachButton',
					onClick: () => this.fileFieldRef && this.fileFieldRef.openFilePicker(),
				},
				Image({
					style: {
						width: 17,
						height: 19,
					},
					resizeMode: 'contain',
					svg: {
						content: '<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.1313 7.48636C16.2696 7.62472 16.2696 7.84904 16.1313 7.98739L15.2028 8.91584C15.0645 9.05419 14.8401 9.05419 14.7018 8.91584L9.2344 3.44845C7.66198 1.87603 5.08893 1.87603 3.5165 3.44845C1.94408 5.02087 1.94408 7.59393 3.5165 9.16635L10.2236 15.8735C11.2097 16.8596 12.8112 16.8596 13.7973 15.8735C14.7834 14.8874 14.7834 13.2859 13.7973 12.2998L7.80493 6.3074C7.40456 5.90703 6.77582 5.90703 6.37545 6.3074C5.97509 6.70777 5.97509 7.33651 6.37545 7.73688L11.1281 12.4895C11.2665 12.6279 11.2665 12.8522 11.1281 12.9906L10.1997 13.919C10.0613 14.0574 9.83698 14.0574 9.69863 13.919L4.94598 9.16635C3.7594 7.97977 3.7594 6.0645 4.94598 4.87793C6.13256 3.69135 8.04783 3.69135 9.2344 4.87793L15.2268 10.8703C16.9991 12.6426 16.9991 15.5307 15.2268 17.303C13.4545 19.0752 10.5664 19.0752 8.79416 17.303L2.08703 10.5958C-0.271604 8.23719 -0.271604 4.37761 2.08703 2.01898C4.44566 -0.339659 8.30525 -0.339659 10.6639 2.01898L16.1313 7.48636Z" fill="#BDC1C6"/></svg>',
					},
				}),
			);
		}

		renderVerticalSeparator()
		{
			return View(
				{
					style: {
						width: 1,
						paddingVertical: 3,
						marginHorizontal: 4,
					},
				},
				View(
					{
						style: {
							backgroundColor: '#dfe0e3',
							flex: 1,
						},
					},
				),
			);
		}

		renderResponsibleButton()
		{
			const { user } = this.state;
			if (!user)
			{
				return null;
			}

			if (user.imageUrl === (currentDomain + DEFAULT_SELECTOR_AVATAR))
			{
				user.imageUrl = DEFAULT_AVATAR;
			}

			return View(
				{
					testId: 'TimelineSchedulerActivityResponsibleUser',
					style: {
						alignSelf: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: 8,
						paddingVertical: 4,
					},
					onClick: this.openResponsibleUserSelector,
				},
				Image({
					style: {
						width: 22,
						height: 22,
						borderRadius: 11,
						backgroundColor: '#d5f1fc',
					},
					resizeMode: 'contain',
					uri: withCurrentDomain(user.imageUrl || DEFAULT_AVATAR),
				}),
			);
		}

		openResponsibleUserSelector()
		{
			ResponsibleSelector.show({
				onSelectedUsers: this.updateResponsibleUser,
				onSelectorHidden: () => this.focus(),
				responsibleId: this.userId,
				layout: this.layout,
			});
		}

		updateResponsibleUser(selectedUsers)
		{
			const selectedUser = selectedUsers[0];

			/** @type {TimelineUserProps} */
			const user = {
				imageUrl: encodeURI(selectedUser.imageUrl),
				title: selectedUser.title,
				userId: selectedUser.id,
			};

			this.setState({ user });
		}

		get userId()
		{
			return get(this.state, 'user.userId', null);
		}

		renderToolbar()
		{
			return Toolbar({
				right: () => new ToolbarButton({
					ref: (ref) => this.createButtonRef = ref,
					text: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_SAVE'),
					loadingText: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_SAVE_PROGRESS'),
					disabled: !this.isSaveAllowed(),
					onClick: () => this.save(),
				}),
				center: () => View(
					{
						style: { flexDirection: 'row' },
					},
					ToolbarIcon({
						svg: '<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.1313 7.48636C16.2696 7.62472 16.2696 7.84904 16.1313 7.98739L15.2028 8.91584C15.0645 9.05419 14.8401 9.05419 14.7018 8.91584L9.2344 3.44845C7.66198 1.87603 5.08893 1.87603 3.5165 3.44845C1.94408 5.02087 1.94408 7.59393 3.5165 9.16635L10.2236 15.8735C11.2097 16.8596 12.8112 16.8596 13.7973 15.8735C14.7834 14.8874 14.7834 13.2859 13.7973 12.2998L7.80493 6.3074C7.40456 5.90703 6.77582 5.90703 6.37545 6.3074C5.97509 6.70777 5.97509 7.33651 6.37545 7.73688L11.1281 12.4895C11.2665 12.6279 11.2665 12.8522 11.1281 12.9906L10.1997 13.919C10.0613 14.0574 9.83698 14.0574 9.69863 13.919L4.94598 9.16635C3.7594 7.97977 3.7594 6.0645 4.94598 4.87793C6.13256 3.69135 8.04783 3.69135 9.2344 4.87793L15.2268 10.8703C16.9991 12.6426 16.9991 15.5307 15.2268 17.303C13.4545 19.0752 10.5664 19.0752 8.79416 17.303L2.08703 10.5958C-0.271604 8.23719 -0.271604 4.37761 2.08703 2.01898C4.44566 -0.339659 8.30525 -0.339659 10.6639 2.01898L16.1313 7.48636Z" fill="#D5D7DB"/></svg>',
						width: 17,
						height: 19,
						onClick: () => {
							if (this.fileFieldRef)
							{
								this.fileFieldRef.openFilePicker();
							}
							else
							{
								InAppNotifier.showNotification({
									title: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ATTACHMENTS_TITLE'),
									message: `${Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ATTACHMENTS_BODY')} 😉`,
									time: 3,
									backgroundColor: '#004f69',
									blur: true,
									code: 'attach_hint',
								});
							}
						},
					}),
					ToolbarIcon({
						svg: '<svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.8209 8.6302C13.4064 8.61776 13.8912 9.08233 13.9036 9.66785C13.9607 12.3582 11.9789 15.5172 8.13976 16.039L8.13894 17.4335L8.59835 17.4339C9.12608 17.4339 9.55389 17.8617 9.55389 18.3894C9.55389 18.9171 9.12608 19.3449 8.59835 19.3449H5.40111C4.87338 19.3449 4.44557 18.9171 4.44557 18.3894C4.44557 17.8617 4.87338 17.4339 5.40111 17.4339L5.85906 17.4335L5.85898 16.0381C2.02549 15.5205 0.0658277 12.4368 0.0956103 9.67891C0.101934 9.0933 0.581793 8.62369 1.1674 8.62989C1.71398 8.63592 2.15949 9.05432 2.21132 9.58621L2.2163 9.70181C2.21036 10.2519 2.51762 11.3083 3.08472 12.1298C3.8989 13.3093 5.15055 13.9929 7.01102 13.9929C8.86116 13.9929 10.1084 13.2962 10.924 12.0939C11.4448 11.3263 11.7482 10.351 11.7806 9.82579L11.7833 9.71288C11.7708 9.12737 12.2354 8.64263 12.8209 8.6302ZM6.99973 0.29834C8.59695 0.29834 9.89175 1.59314 9.89175 3.19036V9.28705C9.89175 10.8843 8.59695 12.1791 6.99973 12.1791C5.40252 12.1791 4.10772 10.8843 4.10772 9.28705V3.19036C4.10772 1.59314 5.40252 0.29834 6.99973 0.29834Z" fill="#D5D7DB"/></svg>',
						width: 14,
						height: 20,
						onClick: () => {
							InAppNotifier.showNotification({
								title: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_VOICE_NOTES_TITLE'),
								message: `${Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_VOICE_NOTES_BODY')} 😉`,
								time: 3,
								backgroundColor: '#004f69',
								blur: true,
								code: 'voice_hint',
							});
						},
					}),
				),
			});
		}

		openDatePicker()
		{
			dialogs.showDatePicker(
				{
					title: Loc.getMessage('M_CRM_TIMELINE_SCHEDULER_ACTIVITY_DEADLINE'),
					type: 'datetime',
					value: this.state.deadline.date.getTime(),
				},
				(eventName, ms) => {
					if (ms)
					{
						this.setState({ deadline: new Moment(ms) }, () => {
							this.focus();
						});
					}
					else
					{
						this.focus();
					}
				},
			);
		}

		focus()
		{
			if (this.textInputRef)
			{
				this.textInputRef.focus();
			}
		}

		isSaveAllowed()
		{
			return this.state.text.length && !this.hasUploadingFiles();
		}

		refreshSaveButton()
		{
			if (this.isSaveAllowed())
			{
				this.saveButton.enable();
			}
			else
			{
				this.saveButton.disable();
			}
		}

		save()
		{
			return new Promise((resolve, reject) => {
				const { text, deadline, files, user } = this.state;
				const { activityId } = this.context;

				let responsibleId = null;

				if (user && user.userId)
				{
					responsibleId = user.userId;
				}

				const data = {
					responsibleId,
					ownerTypeId: this.entity.typeId,
					ownerId: this.entity.id,
					description: text.trim(),
					deadline: deadline.format(datetime()),
					fileTokens: files.map((file) => file.token),
					parentActivityId: activityId || null,
				};

				BX.ajax.runAction('crm.activity.todo.add', { data })
					.then((response) => {
						resolve(response);
						Haptics.notifySuccess();
						this.onActivityCreate(response);
						this.close();
					})
					.catch((response) => {
						void ErrorNotifier.showError(response.errors[0].message);
						reject(response);
					});
			});
		}
	}

	module.exports = { TimelineSchedulerActivityProvider };
});
