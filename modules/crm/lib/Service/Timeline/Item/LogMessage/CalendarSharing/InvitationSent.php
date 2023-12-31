<?php

namespace Bitrix\Crm\Service\Timeline\Item\LogMessage\CalendarSharing;

use Bitrix\Crm\Entity\Index\EO_Contact;
use Bitrix\Crm\Service\Broker\Contact;
use Bitrix\Crm\Service\Container;
use Bitrix\Crm\Service\Timeline\Item\Configurable;
use Bitrix\Crm\Service\Timeline\Item\Mixin\CalendarSharing;
use Bitrix\Crm\Service\Timeline\Layout;
use Bitrix\Crm\Service\Timeline\Layout\Action\Redirect;
use Bitrix\Crm\Service\Timeline\Layout\Body\ContentBlock\ContentBlockFactory;
use Bitrix\Crm\Settings\WorkTime;
use Bitrix\Main\Web\Uri;
use COption;

class InvitationSent extends Configurable
{
	use CalendarSharing;

	public function getType(): string
	{
		return 'CalendarSharingInvitationSent';
	}

	public function getTitle(): ?string
	{
		return $this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_INVITATION_SENT_TITLE');
	}

	public function getIconCode(): ?string
	{
		return Layout\Common\Icon::CALENDAR;
	}

	public function getLogo(): ?Layout\Body\Logo
	{
		return Layout\Common\Logo::getInstance(Layout\Common\Logo::CALENDAR_SHARE)
			->createLogo()
		;
	}

	public function getContentBlocks(): ?array
	{
		$contactName = $this->getContactNameFromHistoryModel();
		$contactUrl = $this->getContactUrlFromHistoryModel();
		$contactCommunication = $this->getHistoryItemModel()->get('CONTACT_COMMUNICATION');

		return [
			'guest' => $this->getGuestContentBlock($contactName, $contactUrl, $contactCommunication),
			'communicationChannel' => $this->getCommunicationChannelContentBlock(),
			'accessibility' => $this->getAccessibilityContentBlock()->setScopeWeb(),
		];
	}

	private function getContactNameFromHistoryModel(): string
	{
		$contactId = $this->getHistoryItemModel()->get('CONTACT_ID');
		$contactTypeId = $this->getHistoryItemModel()->get('CONTACT_TYPE_ID');

		$result = false;
		if ($contactId && $contactTypeId)
		{
			$contactData = Container::getInstance()
				->getEntityBroker($contactTypeId)
				->getById($contactId)
			;

			if ($contactData)
			{
				if ($contactTypeId === \CCrmOwnerType::Contact)
				{
					$result = $contactData->getFullName();
				}
				else if ($contactTypeId === \CCrmOwnerType::Company)
				{
					$result = $contactData->getTitle();
				}
			}
		}

		return $result ?: $this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_GUEST');
	}

	private function getContactUrlFromHistoryModel(): ?Uri
	{
		$result = null;

		$contactId = $this->getHistoryItemModel()->get('CONTACT_ID');
		$contactTypeId = $this->getHistoryItemModel()->get('CONTACT_TYPE_ID');

		if ($contactId && $contactTypeId)
		{
			$detailUrl = Container::getInstance()
				->getRouter()
				->getItemDetailUrl(
					$this->getHistoryItemModel()->get('CONTACT_TYPE_ID'),
					$this->getHistoryItemModel()->get('CONTACT_ID')
				)
			;
			if ($detailUrl)
			{
				$result = new Uri($detailUrl);
			}

		}

		return $result;
	}

	public function getAdditionalIconButton(): ?Layout\Footer\IconButton
	{
		$result = null;
		$linkUrl = $this->getLinkUrl();
		if ($linkUrl)
		{
			$result = (new Layout\Footer\IconButton(
				'qr-code',
				$this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_QR_CODE_BUTTON'))
			)
				->setAction(
					(new Layout\Action\JsEvent('CalendarSharingInvitationSent:ShowQr'))
						->addActionParamString('url', $linkUrl)
				)
				->setScopeWeb()
			;
		}

		return $result;
	}

	public function getSlotDefaultSize(): int
	{
		return 60;
	}

	public function needShowNotes(): bool
	{
		return true;
	}

	private function getGuestContentBlock(string $contactName, ?Uri $contactUrl, ?string $contactCommunication): Layout\Body\ContentBlock
	{
		return (new Layout\Body\ContentBlock\ContentBlockWithTitle())
			->setInline()
			->setTitle(
				$this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_GUEST')
			)
			->setContentBlock(
				(new Layout\Body\ContentBlock\LineOfTextBlocks())
					->addContentBlock(
						'contactProfile',
						ContentBlockFactory::createTextOrLink(
							$contactName, $contactUrl ? new Redirect($contactUrl) : null
						)
					)
					->addContentBlock(
						'contactCommunication',
						(new Layout\Body\ContentBlock\Text())
							->setValue($contactCommunication)
					)
			)
		;
	}

	private function getCommunicationChannelContentBlock(): Layout\Body\ContentBlock
	{
		return (new Layout\Body\ContentBlock\ContentBlockWithTitle())
			->setInline()
			->setTitle(
				$this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_COMMUNICATION_CHANNEL')
			)
			->setContentBlock(
				(new Layout\Body\ContentBlock\Text())
					->setValue(
						$this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_COMMUNICATION_CHANNEL_VALUE')
					)
			)
		;
	}

	private function getAccessibilityContentBlock(): Layout\Body\ContentBlock
	{
		$workTimeData = (new WorkTime())->getData();
		$timeFrom = $workTimeData['TIME_FROM'];
		$timeTo = $workTimeData['TIME_TO'];

		return (new Layout\Body\ContentBlock\ContentBlockWithTitle())
			->setInline()
			->setTitle(
				$this->getMessage('CRM_TIMELINE_CALENDAR_SHARING_ACCESSIBILITY')
			)
			->setContentBlock(
				(new Layout\Body\ContentBlock\Calendar\SharingSlotsList())
					->addListItem((new Layout\Body\ContentBlock\Calendar\SharingSlotsListItem())
						->setType(Layout\Body\ContentBlock\Calendar\SharingSlotsListItem::WORK_DAYS_TYPE)
						->setTimeStart($this->getMinutesFromWorkTimeObject($timeFrom))
						->setTimeEnd($this->getMinutesFromWorkTimeObject($timeTo))
						->setSlotLength($this->getSlotDefaultSize())
					)
			)
		;
	}

	private function getMinutesFromWorkTimeObject($workTime): int
	{
		return $workTime->hours * 60 + $workTime->minutes;
	}
}