function (name, token, next){

  if (Locals[name] !== undefined) {

    Locals[name](token, req, res, nextLocal);

  } else {

    nextLocal();
  }

}