<?php
namespace Bitrix\Crm\Statistics\Entity;

use Bitrix\Main;
use Bitrix\Main\Entity;

/**
 * Class LeadChannelStatisticsTable
 *
 * DO NOT WRITE ANYTHING BELOW THIS
 *
 * <<< ORMENTITYANNOTATION
 * @method static EO_LeadChannelStatistics_Query query()
 * @method static EO_LeadChannelStatistics_Result getByPrimary($primary, array $parameters = [])
 * @method static EO_LeadChannelStatistics_Result getById($id)
 * @method static EO_LeadChannelStatistics_Result getList(array $parameters = [])
 * @method static EO_LeadChannelStatistics_Entity getEntity()
 * @method static \Bitrix\Crm\Statistics\Entity\EO_LeadChannelStatistics createObject($setDefaultValues = true)
 * @method static \Bitrix\Crm\Statistics\Entity\EO_LeadChannelStatistics_Collection createCollection()
 * @method static \Bitrix\Crm\Statistics\Entity\EO_LeadChannelStatistics wakeUpObject($row)
 * @method static \Bitrix\Crm\Statistics\Entity\EO_LeadChannelStatistics_Collection wakeUpCollection($rows)
 */
class LeadChannelStatisticsTable  extends Entity\DataManager
{
	/**
	* @return string
	*/
	public static function getTableName()
	{
		return 'b_crm_lead_channel_stat';
	}
	/**
	* @return array
	*/
	public static function getMap()
	{
		return array(
			'OWNER_ID' => array('data_type' => 'integer', 'required' => true, 'primary' => true),
			'CREATED_DATE' => array('data_type' => 'date', 'required' => true),
			'CHANNEL_TYPE_ID' => array('data_type' => 'integer', 'primary' => true, 'required' => true),
			'CHANNEL_ORIGIN_ID' => array('data_type' => 'string'),
			'CHANNEL_COMPONENT_ID' => array('data_type' => 'string'),
			'RESPONSIBLE_ID' => array('data_type' => 'integer'),
			'STATUS_SEMANTIC_ID' => array('data_type' => 'string')
		);
	}
	/**
	* @return void
	*/
	public static function upsert(array $data)
	{
		$fields = array(
			'CREATED_DATE' => isset($data['CREATED_DATE']) ? $data['CREATED_DATE'] : null,
			'CHANNEL_ORIGIN_ID' => isset($data['CHANNEL_ORIGIN_ID']) ? $data['CHANNEL_ORIGIN_ID'] : '',
			'CHANNEL_COMPONENT_ID' => isset($data['CHANNEL_COMPONENT_ID']) ? $data['CHANNEL_COMPONENT_ID'] : '',
			'RESPONSIBLE_ID' => isset($data['RESPONSIBLE_ID']) ? (int)$data['RESPONSIBLE_ID'] : 0,
			'STATUS_SEMANTIC_ID' => isset($data['STATUS_SEMANTIC_ID']) ? $data['STATUS_SEMANTIC_ID'] : ''
		);

		$connection = Main\Application::getConnection();
		$queries = $connection->getSqlHelper()->prepareMerge(
			'b_crm_lead_channel_stat',
			array('OWNER_ID', 'CHANNEL_TYPE_ID'),
			array_merge(
				$fields,
				array(
					'OWNER_ID' => isset($data['OWNER_ID']) ? (int)$data['OWNER_ID'] : 0,
					'CHANNEL_TYPE_ID' => isset($data['CHANNEL_TYPE_ID']) ? (int)$data['CHANNEL_TYPE_ID'] : 0
				)
			),
			$fields
		);

		foreach($queries as $query)
		{
			$connection->queryExecute($query);
		}
	}
	/**
	* @return void
	*/
	public static function deleteByOwner($ownerID)
	{
		if(!is_int($ownerID))
		{
			$ownerID = (int)$ownerID;
		}

		if($ownerID <= 0)
		{
			throw new Main\ArgumentException('Owner ID must be greater than zero.', 'ownerID');
		}

		Main\Application::getConnection()->queryExecute("DELETE FROM b_crm_lead_channel_stat WHERE OWNER_ID = {$ownerID}");
	}
	/**
	 * @return void
	 */
	public static function deleteByFilter(array $filter)
	{
		$ownerID = isset($filter['OWNER_ID']) ? (int)$filter['OWNER_ID'] : 0;
		if($ownerID <= 0)
		{
			throw new Main\ArgumentException('Owner ID must be greater than zero.', 'ownerID');
		}

		$channelTypeID = isset($filter['CHANNEL_TYPE_ID']) ? $filter['CHANNEL_TYPE_ID'] : array();
		if(!is_array($channelTypeID))
		{
			$channelTypeID = $channelTypeID > 0 ? array($channelTypeID) : array();
		}

		if(!empty($channelTypeID))
		{
			$channelTypeIDs = implode(',', $channelTypeID);
			Main\Application::getConnection()->queryExecute(
				"DELETE FROM b_crm_lead_channel_stat WHERE OWNER_ID = {$ownerID} AND CHANNEL_TYPE_ID IN({$channelTypeIDs})");
		}
		else
		{
			Main\Application::getConnection()->queryExecute("DELETE FROM b_crm_lead_channel_stat WHERE OWNER_ID = {$ownerID}");
		}
	}
	/**
	 * @return void
	 */
	public static function synchronizeResponsible($ownerID, $userID)
	{
		if(!is_int($ownerID))
		{
			$ownerID = (int)$ownerID;
		}

		if($ownerID <= 0)
		{
			throw new Main\ArgumentException('Owner ID must be greater than zero.', 'ownerID');
		}

		if(!is_int($userID))
		{
			$userID = (int)$userID;
		}
		$userID = max($userID, 0);

		Main\Application::getConnection()->queryExecute(
			"UPDATE b_crm_lead_channel_stat SET RESPONSIBLE_ID = {$userID} WHERE OWNER_ID = {$ownerID}"
		);
	}
}