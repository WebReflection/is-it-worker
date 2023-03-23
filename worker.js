addEventListener('message', ({data}) => {
  try {
    const target = data.split('.').reduce(
      ($, k) => $ == null ? $ : $[k],
      globalThis
    );
    const type = typeof target;
    postMessage([
      type,
      /^(object|function)$/.test(type) && target ?
        Reflect.ownKeys(target).map(String).sort() : []
    ]);
  }
  catch ({message}) {
    postMessage(['error', [{message}]]);
  }
}, {once: true});
