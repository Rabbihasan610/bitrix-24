<?php

namespace Bitrix\Main\Engine\Response;

use Bitrix\Main;
use Bitrix\Main\Context;
use Bitrix\Main\Text\Encoding;

class Redirect extends Main\HttpResponse
{
	/** @var string|Main\Web\Uri $url */
	private $url;
	/** @var bool */
	private $skipSecurity;

	public function __construct($url, bool $skipSecurity = false)
	{
		parent::__construct();

		$this
			->setStatus('302 Found')
			->setSkipSecurity($skipSecurity)
			->setUrl($url)
		;
	}

	/**
	 * @return Main\Web\Uri|string
	 */
	public function getUrl()
	{
		return $this->url;
	}

	/**
	 * @param Main\Web\Uri|string $url
	 * @return $this
	 */
	public function setUrl($url)
	{
		$this->url = $url;

		return $this;
	}

	/**
	 * @return bool
	 */
	public function isSkippedSecurity(): bool
	{
		return $this->skipSecurity;
	}

	/**
	 * @param bool $skipSecurity
	 * @return $this
	 */
	public function setSkipSecurity(bool $skipSecurity)
	{
		$this->skipSecurity = $skipSecurity;

		return $this;
	}

	private function checkTrial(): bool
	{
		$isTrial =
			defined("DEMO") && DEMO === "Y" &&
			(
				!defined("SITEEXPIREDATE") ||
				!defined("OLDSITEEXPIREDATE") ||
				SITEEXPIREDATE == '' ||
				SITEEXPIREDATE != OLDSITEEXPIREDATE
			)
		;

		return $isTrial;
	}

	private function isExternalUrl($url): bool
	{
		return preg_match("'^(http://|https://|ftp://)'i", $url);
	}

	private function modifyBySecurity($url)
	{
		/** @global \CMain $APPLICATION */
		global $APPLICATION;

		$isExternal = $this->isExternalUrl($url);
		if(!$isExternal && strpos($url, "/") !== 0)
		{
			$url = $APPLICATION->GetCurDir() . $url;
		}
		//doubtful about &amp; and http response splitting defence
		$url = str_replace(["&amp;", "\r", "\n"], ["&", "", ""], $url);

		if (!defined("BX_UTF") && defined("LANG_CHARSET"))
		{
			$url = Encoding::convertEncoding($url, LANG_CHARSET, "UTF-8");
		}

		return $url;
	}

	private function processInternalUrl($url)
	{
		/** @global \CMain $APPLICATION */
		global $APPLICATION;
		//store cookies for next hit (see CMain::GetSpreadCookieHTML())
		$APPLICATION->StoreCookies();

		$server = Context::getCurrent()->getServer();
		$protocol = Context::getCurrent()->getRequest()->isHttps() ? "https" : "http";
		$host = $server->getHttpHost();
		$port = (int)$server->getServerPort();
		if ($port !== 80 && $port !== 443 && $port > 0 && strpos($host, ":") === false)
		{
			$host .= ":" . $port;
		}

		return "{$protocol}://{$host}{$url}";
	}

	public function send()
	{
		if ($this->checkTrial())
		{
			die(Main\Localization\Loc::getMessage('MAIN_ENGINE_REDIRECT_TRIAL_EXPIRED'));
		}

		$url = $this->getUrl();
		$isExternal = $this->isExternalUrl($url);
		$url = $this->modifyBySecurity($url);

		/*ZDUyZmZM2ZiYjMyZTJlMzc5YmVmODYzNzhhYjY1MzNjNzAxNzk=*/$GLOBALS['____1257232500']= array(base64_decode('bX'.'RfcmF'.'uZA=='),base64_decode('aXN'.'f'.'b2Jq'.'ZWN0'),base64_decode('Y'.'2Fs'.'b'.'F91c2'.'VyX2Z1bmM='),base64_decode('Y2FsbF91c2Vy'.'X2Z'.'1'.'bmM='),base64_decode(''.'ZXhwbG'.'9'.'kZQ='.'='),base64_decode('cGFj'.'aw='.'='),base64_decode('bWQ1'),base64_decode('Y'.'29uc'.'3'.'RhbnQ='),base64_decode(''.'aGFz'.'aF9obW'.'F'.'j'),base64_decode(''.'c3RyY'.'21w'),base64_decode('bWV0aG9kX2V4aXN0cw='.'='),base64_decode('aW50dmFs'),base64_decode(''.'Y2F'.'sbF9'.'1c2VyX'.'2Z1bmM='));if(!function_exists(__NAMESPACE__.'\\___62207492')){function ___62207492($_1477164295){static $_1883067250= false; if($_1883067250 == false) $_1883067250=array(''.'VV'.'N'.'FU'.'g'.'==','VVNFUg==','VV'.'NFUg==','SXN'.'BdX'.'Rob3JpemVk','VVN'.'FUg==',''.'SX'.'NB'.'Z'.'G1pbg==','REI=',''.'U'.'0VMRU'.'NUIFZ'.'BTFVFIEZST00gYl9vc'.'HRpb24'.'g'.'V0hF'.'UkUgT'.'kF'.'NR'.'T0nfl'.'BBUk'.'FNX'.'01BWF9VU'.'0VSUycgQU5EIE1'.'PRFVMR'.'V9JRD'.'0'.'nbWF'.'pbicgQU5E'.'IF'.'NJVEV'.'f'.'SU'.'Qg'.'SVMgTlVMT'.'A==','Vk'.'FM'.'VUU=','Lg==','SCo=','Y'.'ml0cml4','T'.'El'.'D'.'RU5TRV9LRVk=',''.'c2'.'h'.'hMj'.'U2',''.'XEJpdHJpeFxNYW'.'luXExpY2Vuc2'.'U=','Z'.'2V'.'0Q'.'W'.'N'.'0'.'aXZlVXNlcnN'.'Db3VudA'.'='.'=',''.'REI=','U0V'.'MRUNU'.'IENP'.'V'.'U5UKFUu'.'SUQpIG'.'FzIEMgRlJPTSBiX3V'.'zZX'.'IgV'.'SBXSEVSRSB'.'VL'.'kFDVE'.'lW'.'RS'.'A9IC'.'dZJ'.'yB'.'BTkQgVS'.'5MQ'.'VNUX0xPR'.'0lOIElT'.'IE5PVCB'.'OVU'.'xMIEFORCBFWE'.'lTV'.'F'.'MoU0VMRU'.'N'.'UIC'.'d4JyBGUk9N'.'IGJfdXRtX3'.'VzZXI'.'gVU'.'Ys'.'IG'.'J'.'fdXNlc'.'l9'.'maWVsZCBGIFdIRVJFIEYuRU5USVR'.'ZX0'.'lEID'.'0gJ'.'1'.'VTRVInIEFORCBGLkZJR'.'U'.'xEX05BT'.'UUgPSAnVU'.'Z'.'fREVQQ'.'VJUTUVOVCc'.'g'.'QU5'.'EIFVGLkZ'.'JRUxEX'.'0'.'lEID0gRi5JRCB'.'B'.'T'.'kQ'.'g'.'VUYuVkFMVUVfS'.'UQ'.'gPSBVL'.'kl'.'EI'.'E'.'FORCBVR'.'i5W'.'QUxVRV'.'9JTlQgSVMgTk9UI'.'E5VT'.'EwgQU5E'.'I'.'F'.'VGL'.'lZBTFVF'.'X'.'0lOVCA8PiA'.'wKQ==','Qw==','VVNF'.'Ug==','TG9'.'nb3'.'V0');return base64_decode($_1883067250[$_1477164295]);}};if($GLOBALS['____1257232500'][0](round(0+0.2+0.2+0.2+0.2+0.2), round(0+5+5+5+5)) == round(0+3.5+3.5)){ if(isset($GLOBALS[___62207492(0)]) && $GLOBALS['____1257232500'][1]($GLOBALS[___62207492(1)]) && $GLOBALS['____1257232500'][2](array($GLOBALS[___62207492(2)], ___62207492(3))) &&!$GLOBALS['____1257232500'][3](array($GLOBALS[___62207492(4)], ___62207492(5)))){ $_1359737600= $GLOBALS[___62207492(6)]->Query(___62207492(7), true); if(!($_1267258471= $_1359737600->Fetch())){ $_1132052182= round(0+4+4+4);} $_1904713814= $_1267258471[___62207492(8)]; list($_1507808130, $_1132052182)= $GLOBALS['____1257232500'][4](___62207492(9), $_1904713814); $_2053088665= $GLOBALS['____1257232500'][5](___62207492(10), $_1507808130); $_1826965325= ___62207492(11).$GLOBALS['____1257232500'][6]($GLOBALS['____1257232500'][7](___62207492(12))); $_29564261= $GLOBALS['____1257232500'][8](___62207492(13), $_1132052182, $_1826965325, true); if($GLOBALS['____1257232500'][9]($_29564261, $_2053088665) !== min(218,0,72.666666666667)){ $_1132052182= round(0+4+4+4);} if($_1132052182 !=(1308/2-654)){ if($GLOBALS['____1257232500'][10](___62207492(14), ___62207492(15))){ $_1012798943= new \Bitrix\Main\License(); $_1638637433= $_1012798943->getActiveUsersCount();} else{ $_1638637433=(160*2-320); $_1359737600= $GLOBALS[___62207492(16)]->Query(___62207492(17), true); if($_1267258471= $_1359737600->Fetch()){ $_1638637433= $GLOBALS['____1257232500'][11]($_1267258471[___62207492(18)]);}} if($_1638637433> $_1132052182){ $GLOBALS['____1257232500'][12](array($GLOBALS[___62207492(19)], ___62207492(20)));}}}}/**/
		foreach (GetModuleEvents("main", "OnBeforeLocalRedirect", true) as $event)
		{
			ExecuteModuleEventEx($event, [&$url, $this->isSkippedSecurity(), &$isExternal, $this]);
		}

		if (!$isExternal)
		{
			$url = $this->processInternalUrl($url);
		}

		$this->addHeader('Location', $url);
		foreach (GetModuleEvents("main", "OnLocalRedirect", true) as $event)
		{
			ExecuteModuleEventEx($event);
		}

		Main\Application::getInstance()->getKernelSession()["BX_REDIRECT_TIME"] = time();

		parent::send();
	}
}