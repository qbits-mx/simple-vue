import axios from "axios";

const traduce = async (info) => {
  return await cargaJson()
  .then((data) => {
      var errorResponse = '';
      var error = '';
      var exTypeNumber               = info.data["exceptionTypeNumber"];
      var strengthViolations = typeof (info.data["strengthViolations"]) === 'undefined' ? '' : info.data["strengthViolations"];
      var errorNumber        = typeof (info.data["errorNumber"]) === 'undefined' ? '0' : info.data["errorNumber"];

      error = filtra(data, errorNumber, exTypeNumber);

      if (error.length == 0 && strengthViolations.length == 0) {
        //return result; // for us to see the real full untraducetd error
        return filtra(data, 0, 4013); // Unknown Error
      } 

      if (strengthViolations.length == 0) {
        return getParams(info.data["params"], error, "");
      } 

      for (var i = 0; i < strengthViolations.length; i++) {
        errorNumber = info.data["strengthViolations"][i]["errorNumber"];
        error = filtra(data, errorNumber, exTypeNumber);
        if (error.length > 0) {
          var params = info.data["strengthViolations"][i]["params"];
          errorResponse = errorResponse + getParams(params, error, "- ");
        } else {
          errorResponse = errorResponse + filtra(data, 0, 4013);
        }
      }
      return errorResponse;
  })
  .catch((err) => {
    console.log(err)
  });
}

const getParams = (params, error, divisor) => {
  for (var j = 1; j <= params.length; j++) {
    error = error.toString().replace("@" + j, params[j-1]);
  }
  return divisor + error + "\n";
}

const cargaJson = async () => {
  //console.log(navigator.language.split('-')[0]);
  return await axios({
    method: 'get',
    url: `../errMsg${navigator.language.split('-')[0]}.json`
  }).then((result) => {
    return result.data;
  }).catch((err) => {
    console.log(err)
  });
}

const filtra = (msg, errorNumber, exTypeNumber) => {
  var result = msg
  .filter(function (err) {
    return err.errorNumber == errorNumber && err.exceptionTypeNumber == exTypeNumber
  })
  .map(function (err) {
    return err.msg;
  });
  return result;
}

export { traduce }