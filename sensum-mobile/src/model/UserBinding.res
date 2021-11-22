type user = {tryGatherAcolytes: unit => Js.Promise.t<string>}

@module("./User") external user: user = "default"
