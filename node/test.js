var util = require('util');
var DomJS = require("dom-js").DomJS;

var domjs = new DomJS();

var string = '<xml><!-- the comment --><elem someAtt="fat &amp; red">Hello &amp; World</elem></xml>';
var xml = '<imsx_POXEnvelopeRequest>\n\r    <imsx_POXHeader> \n\r     <imsx_POXRequestHeaderInfo>        <imsx_version>V1.0</imsx_version>        <imsx_messageIdentifier>12341234</imsx_messageIdentifier>      </imsx_POXRequestHeaderInfo>    </imsx_POXHeader>    <imsx_POXBody>      <replaceResultRequest>        <resultRecord>          <sourcedGUID>            <sourcedId>OANLXOQF</sourcedId>          </sourcedGUID>          <result>            <resultScore>              <language>en</language>              <textString>0.0</textString>            </resultScore>          </result>        </resultRecord>      </replaceResultRequest>    </imsx_POXBody>  </imsx_POXEnvelopeRequest>';



var sid = xml.match("<sourcedId>(.*?)</sourcedId>")[1];
var score = xml.match("<textString>(.*?)</textString>")[1];
console.log(sid);
console.log(score);


