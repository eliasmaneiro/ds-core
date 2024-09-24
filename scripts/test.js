const set = (obj, path, value) => {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;
    return acc[key];
  }, obj);
};

const object = { a: [{ bar: { c: 3 } }] };

set(object, "a[0].bar.c", 4);
console.log(object.a[0].bar.c);

set(object, ["a", "1", "y", "1", "z"], 5);
console.log(object);
