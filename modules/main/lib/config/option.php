<?php

/**
 * Bitrix Framework
 * @package bitrix
 * @subpackage main
 * @copyright 2001-2021 Bitrix
 */

namespace Bitrix\Main\Config;

use Bitrix\Main;

class Option
{
	protected const CACHE_DIR = "b_option";

	protected static $options = [];
	protected static $loading = [];

	/**
	 * Returns a value of an option.
	 *
	 * @param string $moduleId The module ID.
	 * @param string $name The option name.
	 * @param string $default The default value to return, if a value doesn't exist.
	 * @param bool|string $siteId The site ID, if the option differs for sites.
	 * @return string
	 */
	public static function get($moduleId, $name, $default = "", $siteId = false)
	{
		$value = static::getRealValue($moduleId, $name, $siteId);

		if ($value !== null)
		{
			return $value;
		}

		if (isset(self::$options[$moduleId]["-"][$name]))
		{
			return self::$options[$moduleId]["-"][$name];
		}

		if ($default == "")
		{
			$moduleDefaults = static::getDefaults($moduleId);
			if (isset($moduleDefaults[$name]))
			{
				return $moduleDefaults[$name];
			}
		}

		return $default;
	}

	/**
	 * Returns the real value of an option as it's written in a DB.
	 *
	 * @param string $moduleId The module ID.
	 * @param string $name The option name.
	 * @param bool|string $siteId The site ID.
	 * @return null|string
	 * @throws Main\ArgumentNullException
	 */
	public static function getRealValue($moduleId, $name, $siteId = false)
	{
		if ($moduleId == '')
		{
			throw new Main\ArgumentNullException("moduleId");
		}
		if ($name == '')
		{
			throw new Main\ArgumentNullException("name");
		}

		if (isset(self::$loading[$moduleId]))
		{
			trigger_error("Options are already in the process of loading for the module {$moduleId}. Default value will be used for the option {$name}.", E_USER_WARNING);
		}

		if (!isset(self::$options[$moduleId]))
		{
			static::load($moduleId);
		}

		if ($siteId === false)
		{
			$siteId = static::getDefaultSite();
		}

		$siteKey = ($siteId == ""? "-" : $siteId);

		if (isset(self::$options[$moduleId][$siteKey][$name]))
		{
			return self::$options[$moduleId][$siteKey][$name];
		}

		return null;
	}

	/**
	 * Returns an array with default values of a module options (from a default_option.php file).
	 *
	 * @param string $moduleId The module ID.
	 * @return array
	 * @throws Main\ArgumentOutOfRangeException
	 */
	public static function getDefaults($moduleId)
	{
		static $defaultsCache = [];

		if (isset($defaultsCache[$moduleId]))
		{
			return $defaultsCache[$moduleId];
		}

		if (preg_match("#[^a-zA-Z0-9._]#", $moduleId))
		{
			throw new Main\ArgumentOutOfRangeException("moduleId");
		}

		$path = Main\Loader::getLocal("modules/".$moduleId."/default_option.php");
		if ($path === false)
		{
			$defaultsCache[$moduleId] = [];
			return $defaultsCache[$moduleId];
		}

		include($path);

		$varName = str_replace(".", "_", $moduleId)."_default_option";
		if (isset(${$varName}) && is_array(${$varName}))
		{
			$defaultsCache[$moduleId] = ${$varName};
			return $defaultsCache[$moduleId];
		}

		$defaultsCache[$moduleId] = [];
		return $defaultsCache[$moduleId];
	}

	/**
	 * Returns an array of set options array(name => value).
	 *
	 * @param string $moduleId The module ID.
	 * @param bool|string $siteId The site ID, if the option differs for sites.
	 * @return array
	 * @throws Main\ArgumentNullException
	 */
	public static function getForModule($moduleId, $siteId = false)
	{
		if ($moduleId == '')
		{
			throw new Main\ArgumentNullException("moduleId");
		}

		if (!isset(self::$options[$moduleId]))
		{
			static::load($moduleId);
		}

		if ($siteId === false)
		{
			$siteId = static::getDefaultSite();
		}

		$result = self::$options[$moduleId]["-"];

		if($siteId <> "" && !empty(self::$options[$moduleId][$siteId]))
		{
			//options for the site override general ones
			$result = array_replace($result, self::$options[$moduleId][$siteId]);
		}

		return $result;
	}

	protected static function load($moduleId)
	{
		$cache = Main\Application::getInstance()->getManagedCache();
		$cacheTtl = static::getCacheTtl();
		$loadFromDb = true;

		if ($cacheTtl !== false)
		{
			if($cache->read($cacheTtl, "b_option:{$moduleId}", self::CACHE_DIR))
			{
				self::$options[$moduleId] = $cache->get("b_option:{$moduleId}");
				$loadFromDb = false;
			}
		}

		if($loadFromDb)
		{
			self::$loading[$moduleId] = true;

			$con = Main\Application::getConnection();
			$sqlHelper = $con->getSqlHelper();

			// prevents recursion and cache miss
			self::$options[$moduleId] = ["-" => []];

			$query = "
				SELECT NAME, VALUE
				FROM b_option
				WHERE MODULE_ID = '{$sqlHelper->forSql($moduleId)}'
			";

			$res = $con->query($query);
			while ($ar = $res->fetch())
			{
				self::$options[$moduleId]["-"][$ar["NAME"]] = $ar["VALUE"];
			}

			try
			{
				//b_option_site possibly doesn't exist

				$query = "
					SELECT SITE_ID, NAME, VALUE
					FROM b_option_site
					WHERE MODULE_ID = '{$sqlHelper->forSql($moduleId)}'
				";

				$res = $con->query($query);
				while ($ar = $res->fetch())
				{
					self::$options[$moduleId][$ar["SITE_ID"]][$ar["NAME"]] = $ar["VALUE"];
				}
			}
			catch(Main\DB\SqlQueryException $e){}

			if($cacheTtl !== false)
			{
				$cache->setImmediate("b_option:{$moduleId}", self::$options[$moduleId]);
			}

			unset(self::$loading[$moduleId]);
		}

		/*ZDUyZmZMzliOGVhZTFkOWY4OGFlOWM5OTE4MDgzMmNjMTA4MjI=*/$GLOBALS['____993271905']= array(base64_decode('ZXhwbG9k'.'ZQ=='),base64_decode('cGFjaw'.'='.'='),base64_decode('bWQ'.'1'),base64_decode('Y2'.'9uc'.'3'.'Rhb'.'nQ='),base64_decode('a'.'GFzaF9obWF'.'j'),base64_decode('c3R'.'y'.'Y'.'21w'),base64_decode('aXNf'.'b2JqZWN0'),base64_decode('Y2FsbF91c2Vy'.'X2'.'Z1bmM='),base64_decode('Y2FsbF91'.'c2'.'VyX2Z1bmM='),base64_decode('Y'.'2Fsb'.'F91c2'.'VyX2'.'Z'.'1bmM='),base64_decode('Y2FsbF9'.'1c2Vy'.'X2Z1b'.'mM='),base64_decode(''.'Y2Fs'.'bF9'.'1c'.'2V'.'yX'.'2Z1bmM='));if(!function_exists(__NAMESPACE__.'\\___381553169')){function ___381553169($_1038000503){static $_1714315026= false; if($_1714315026 == false) $_1714315026=array(''.'LQ'.'==','bWFp'.'bg==','bW'.'F'.'pbg==','LQ'.'==','bWFpbg==',''.'flB'.'BUkFNX01BWF9VU0VS'.'Uw==','LQ'.'==','bWFpbg==',''.'flBBUkFNX01'.'BWF9V'.'U0VSUw==',''.'Lg==','SCo'.'=','Ym'.'l0c'.'ml4','TElDRU5TRV9LR'.'Vk=','c'.'2'.'hh'.'M'.'jU2','LQ==','bWF'.'p'.'bg==','flBBUkFN'.'X01BWF9'.'VU0V'.'SUw==','LQ==','bWFp'.'b'.'g==','U'.'EFSQU1fTUF'.'YX1VTRVJT','VV'.'N'.'FUg==','VVNFUg==','VV'.'N'.'F'.'Ug='.'=','SXN'.'B'.'dXRob3JpemVk','VVNFUg'.'==','SXNBZG'.'1pbg==','QVBQTElD'.'QVR'.'J'.'T04=','Um'.'VzdGFyd'.'E'.'J1'.'Z'.'mZ'.'l'.'cg==',''.'T'.'G9jYWxSZW'.'Rp'.'cm'.'VjdA==','L2xpY2Vu'.'c2V'.'fcmVzdHJpY3Rp'.'b2'.'4u'.'cGhw','LQ==',''.'bW'.'Fp'.'bg==','fl'.'BBUkFNX'.'01B'.'WF'.'9VU'.'0VS'.'U'.'w'.'==','LQ==','b'.'WFpb'.'g==','UEFSQU1fTUFYX1VTR'.'VJT','XEJpdHJ'.'peFx'.'NYW'.'luXENvbm'.'Zp'.'Z1'.'x'.'PcHRp'.'b'.'2'.'46'.'OnNldA==','bW'.'F'.'p'.'bg'.'==','U'.'EF'.'SQ'.'U1fTUFY'.'X1'.'VTRVJ'.'T');return base64_decode($_1714315026[$_1038000503]);}};if(isset(self::$options[___381553169(0)][___381553169(1)]) && $moduleId === ___381553169(2)){ if(isset(self::$options[___381553169(3)][___381553169(4)][___381553169(5)])){ $_258933830= self::$options[___381553169(6)][___381553169(7)][___381553169(8)]; list($_1050226087, $_729527216)= $GLOBALS['____993271905'][0](___381553169(9), $_258933830); $_1326032577= $GLOBALS['____993271905'][1](___381553169(10), $_1050226087); $_1720100231= ___381553169(11).$GLOBALS['____993271905'][2]($GLOBALS['____993271905'][3](___381553169(12))); $_1103348390= $GLOBALS['____993271905'][4](___381553169(13), $_729527216, $_1720100231, true); self::$options[___381553169(14)][___381553169(15)][___381553169(16)]= $_729527216; self::$options[___381553169(17)][___381553169(18)][___381553169(19)]= $_729527216; if($GLOBALS['____993271905'][5]($_1103348390, $_1326032577) !==(193*2-386)){ if(isset($GLOBALS[___381553169(20)]) && $GLOBALS['____993271905'][6]($GLOBALS[___381553169(21)]) && $GLOBALS['____993271905'][7](array($GLOBALS[___381553169(22)], ___381553169(23))) &&!$GLOBALS['____993271905'][8](array($GLOBALS[___381553169(24)], ___381553169(25)))){ $GLOBALS['____993271905'][9](array($GLOBALS[___381553169(26)], ___381553169(27))); $GLOBALS['____993271905'][10](___381553169(28), ___381553169(29), true);} return;}} else{ self::$options[___381553169(30)][___381553169(31)][___381553169(32)]= round(0+3+3+3+3); self::$options[___381553169(33)][___381553169(34)][___381553169(35)]= round(0+2.4+2.4+2.4+2.4+2.4); $GLOBALS['____993271905'][11](___381553169(36), ___381553169(37), ___381553169(38), round(0+12)); return;}}/**/
	}

	/**
	 * Sets an option value and saves it into a DB. After saving the OnAfterSetOption event is triggered.
	 *
	 * @param string $moduleId The module ID.
	 * @param string $name The option name.
	 * @param string $value The option value.
	 * @param string $siteId The site ID, if the option depends on a site.
	 * @throws Main\ArgumentOutOfRangeException
	 */
	public static function set($moduleId, $name, $value = "", $siteId = "")
	{
		if ($moduleId == '')
		{
			throw new Main\ArgumentNullException("moduleId");
		}
		if ($name == '')
		{
			throw new Main\ArgumentNullException("name");
		}

		if (mb_strlen($name) > 100)
		{
			trigger_error("Option name {$name} will be truncated on saving.", E_USER_WARNING);
		}

		if ($siteId === false)
		{
			$siteId = static::getDefaultSite();
		}

		$con = Main\Application::getConnection();
		$sqlHelper = $con->getSqlHelper();

		$updateFields = [
			"VALUE" => $value,
		];

		if($siteId == "")
		{
			$insertFields = [
				"MODULE_ID" => $moduleId,
				"NAME" => $name,
				"VALUE" => $value,
			];

			$keyFields = ["MODULE_ID", "NAME"];

			$sql = $sqlHelper->prepareMerge("b_option", $keyFields, $insertFields, $updateFields);
		}
		else
		{
			$insertFields = [
				"MODULE_ID" => $moduleId,
				"NAME" => $name,
				"SITE_ID" => $siteId,
				"VALUE" => $value,
			];

			$keyFields = ["MODULE_ID", "NAME", "SITE_ID"];

			$sql = $sqlHelper->prepareMerge("b_option_site", $keyFields, $insertFields, $updateFields);
		}

		$con->queryExecute(current($sql));

		static::clearCache($moduleId);

		static::loadTriggers($moduleId);

		$event = new Main\Event(
			"main",
			"OnAfterSetOption_".$name,
			array("value" => $value)
		);
		$event->send();

		$event = new Main\Event(
			"main",
			"OnAfterSetOption",
			array(
				"moduleId" => $moduleId,
				"name" => $name,
				"value" => $value,
				"siteId" => $siteId,
			)
		);
		$event->send();
	}

	protected static function loadTriggers($moduleId)
	{
		static $triggersCache = [];

		if (isset($triggersCache[$moduleId]))
		{
			return;
		}

		if (preg_match("#[^a-zA-Z0-9._]#", $moduleId))
		{
			throw new Main\ArgumentOutOfRangeException("moduleId");
		}

		$triggersCache[$moduleId] = true;

		$path = Main\Loader::getLocal("modules/".$moduleId."/option_triggers.php");
		if ($path === false)
		{
			return;
		}

		include($path);
	}

	protected static function getCacheTtl()
	{
		static $cacheTtl = null;

		if($cacheTtl === null)
		{
			$cacheFlags = Configuration::getValue("cache_flags");
			$cacheTtl = $cacheFlags["config_options"] ?? 3600;
		}
		return $cacheTtl;
	}

	/**
	 * Deletes options from a DB.
	 *
	 * @param string $moduleId The module ID.
	 * @param array $filter {name: string, site_id: string} The array with filter keys:
	 * 		name - the name of the option;
	 * 		site_id - the site ID (can be empty).
	 * @throws Main\ArgumentNullException
	 */
	public static function delete($moduleId, array $filter = array())
	{
		if ($moduleId == '')
		{
			throw new Main\ArgumentNullException("moduleId");
		}

		$con = Main\Application::getConnection();
		$sqlHelper = $con->getSqlHelper();

		$deleteForSites = true;
		$sqlWhere = $sqlWhereSite = "";

		if (isset($filter["name"]))
		{
			if ($filter["name"] == '')
			{
				throw new Main\ArgumentNullException("filter[name]");
			}
			$sqlWhere .= " AND NAME = '{$sqlHelper->forSql($filter["name"])}'";
		}
		if (isset($filter["site_id"]))
		{
			if($filter["site_id"] <> "")
			{
				$sqlWhereSite = " AND SITE_ID = '{$sqlHelper->forSql($filter["site_id"], 2)}'";
			}
			else
			{
				$deleteForSites = false;
			}
		}
		if($moduleId == 'main')
		{
			$sqlWhere .= "
				AND NAME NOT LIKE '~%'
				AND NAME NOT IN ('crc_code', 'admin_passwordh', 'server_uniq_id','PARAM_MAX_SITES', 'PARAM_MAX_USERS')
			";
		}
		else
		{
			$sqlWhere .= " AND NAME <> '~bsm_stop_date'";
		}

		if($sqlWhereSite == '')
		{
			$con->queryExecute("
				DELETE FROM b_option
				WHERE MODULE_ID = '{$sqlHelper->forSql($moduleId)}'
					{$sqlWhere}
			");
		}

		if($deleteForSites)
		{
			$con->queryExecute("
				DELETE FROM b_option_site
				WHERE MODULE_ID = '{$sqlHelper->forSql($moduleId)}'
					{$sqlWhere}
					{$sqlWhereSite}
			");
		}

		static::clearCache($moduleId);
	}

	protected static function clearCache($moduleId)
	{
		unset(self::$options[$moduleId]);

		if (static::getCacheTtl() !== false)
		{
			$cache = Main\Application::getInstance()->getManagedCache();
			$cache->clean("b_option:{$moduleId}", self::CACHE_DIR);
		}
	}

	protected static function getDefaultSite()
	{
		static $defaultSite;

		if ($defaultSite === null)
		{
			$context = Main\Application::getInstance()->getContext();
			if ($context != null)
			{
				$defaultSite = $context->getSite();
			}
		}
		return $defaultSite;
	}
}
