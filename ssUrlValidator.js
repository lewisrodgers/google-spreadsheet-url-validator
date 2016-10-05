(function() {
    var ssValidate, url, validURL;
    ssValidate = function(sURL, aURL, aDomains) {
        var error, getError, getMessage, msg, url, validateDomain, validateKey, validateURL;
        url = sURL;
        aURL = typeof aURL !== 'undefined' ? aURL : [
            'https://',
            'docs.google.com',
            '/a/',
            '/spreadsheet/',
            'ccc?key='
        ];
        aDomains = typeof aDomains !== 'undefined' ? aDomains : [
            'com',
            'org',
            'edu'
        ];
        error = false;
        msg = '';
        getError = function() {
            return error;
        };
        getMessage = function() {
            return msg;
        };
        validateDomain = function(str, arr) {
            var domains, result;
            str = str.split('/a/')[1].split('/')[0];
            domains = arr;
            return result = function(str, domains) {
                var domain;
                domain = str.split('.')[1];
                if (domains.indexOf(domain) === -1) {
                    error = true;
                    return msg = 'Invalid domain in spreadsheet URL.';
                }
            }(str, domains);
        };
        validateKey = function(str) {
            var charNum, key;
            key = str.split('=')[1];
            charNum = key.split('');
            if (key === '' || charNum.length !== 44) {
                error = true;
                msg = 'Spreadsheet key may be invalid!';
            }
            return validateDomain(str, aDomains);
        };
        validateURL = function(url, aURL) {
            var results, string, value;
            results = [];
            for (string in aURL) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }
                value = aURL[string];
                if (url.indexOf(value) === -1) {
                    error = true;
                    msg = value + ' not found.';
                    break;
                }
                results.push(validateKey(url));
            }
            window.CP.exitedLoop(1);
            return results;
        }(url, aURL);
        return {
            isError: getError(),
            getMessage: getMessage()
        };
    };
    url = 'https://docs.google.com/a/domain.com/spreadsheet/ccc?key=0Arp1CLnxsONRdFFiYVpFdGFiT3VTMzdoa3F3T2szbFE';
    validURL = ssValidate(url);
    if (validURL.isError) {
        console.log(validURL.getMessage);
    }
}.call(this));
