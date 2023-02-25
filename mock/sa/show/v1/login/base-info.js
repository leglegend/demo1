exports.check = function () {
  //true 本地数据， false 远程服务器数据
  return false;
};

exports.mockData = function (options) {
  let method = options.method,
    params =
      method === "get" ? options.req.query : JSON.parse(options.data || "{}");

  let keyword = []; // 必传的请求参数，如果请求参数中缺少其中一个会报错
  let missing = []; // 缺失的请求参数

  let mock = {
    data: {
      main_domain: "",
      products: [
        {
          type: "byod",
          status: "enable",
        },
        {
          type: "nta",
          status: "enable",
        },
      ],
      domain: "mockgogogo.com",
    },
  };

  for (let i = 0; i < keyword.length; i++) {
    if (!params.hasOwnProperty(keyword[i]) && keyword[i]) {
      missing.push(keyword[i]);
    }
  }

  if (missing.length > 0) {
    return {
      code: 1,
      message: `缺少请求参数：${missing.join("、")}`,
    };
  }

  return {
    code: 0,
    fe_request_params: {
      __label: "[request params]: this is a mock data, so you can ignore me",
      ...params,
    },
    ...mock,
  };
};
