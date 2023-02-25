/**
 * @file mock数据生成模板
 */

exports.check = function () {
  //ture 本地数据， false 远程服务器数据
  return false;
};

// exports.setStatus = function () {
//     return 401;
// }

exports.mockData = function (options) {
  let method = options.method,
    params =
      method === "get" ? options.req.query : JSON.parse(options.data || "{}");

  let keyword = []; // 请求参数
  let missing = []; // 缺失的请求参数

  let mock = {
    data: {
      account: "我是mock账号",
      email: "mock@qq.com",
      phone: "13688888888",
    },
  };

  for (let i = 0; i < keyword.length; i++) {
    if (!params.hasOwnProperty(keyword[i])) {
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
