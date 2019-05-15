class DiliteError extends Error {
  constructor(msg) {
    super(`Dilite: ${msg}`);
  }
}

function factory(factory, inject, setter) {
  return {type: 'factory', factory, inject, setter};
}

function value(value) {
  return {type: 'value', value};
}

function ctor(ctor, inject, setter) {
  return {type: 'ctor', ctor, inject, setter};
}

function setKeyValue(obj, keyParts, value) {
  const key = keyParts[0];

  if (keyParts.length === 1) {
    obj[key] = value;
    return;
  }

  if (obj[key] === undefined) {
    obj[key] = {};
  }

  setKeyValue(obj[key], keyParts.slice(1), value);
}

function getKeyValue(obj, keyParts) {
  const key = keyParts[0];

  if (keyParts.length === 1) {
    return key === '' ? obj : obj[key];
  }

  if (obj[key] === undefined) {
    return undefined;
  }

  return getKeyValue(obj[key], keyParts.slice(1));
}

class Container {
  constructor(initializers = {}) {
    this.values = {};
    this.cache = {
      container: this,
    };
    this.initializers = initializers;
  }

  loadServices(initializers) {
    this.initializers = this.mergeInitializers(
      this.initializers,
      initializers,
      [],
    );
  }

  mergeInitializers(obj1, obj2, path) {
    const obj = {};
    const allKeys = new Set([
      ...Reflect.ownKeys(obj1),
      ...Reflect.ownKeys(obj2),
    ]);

    for (const key of allKeys) {
      const nextPath = [...path, key];

      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        obj[key] = this.mergeInitializers(obj1[key], obj2[key], nextPath);
        this.cache[nextPath.join('.')] = undefined;
      } else if (
        typeof obj1[key] !== 'undefined' &&
        typeof obj2[key] !== 'undefined'
      ) {
        throw new DiliteError(`Key '${nextPath.join('.')}' already exists`);
      } else {
        obj[key] = obj2[key] || obj1[key];
      }
    }

    return obj;
  }

  get(key) {
    const cachedValue = this.cache[key];
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const setValue = (key, value) => {
      setKeyValue(this.values, key.split('.'), value);
      this.cache[key] = value;
      return value;
    };

    const getValue = key => getKeyValue(this.values, key.split('.'));

    const value = getValue(key);
    if (value !== undefined) {
      this.cache[key] = value;
      return value;
    }

    const initializer = getKeyValue(this.initializers, key.split('.'));

    if (!initializer) {
      throw new DiliteError(`Unknown item '${key}' requested`);
    }

    if (initializer.type === undefined) {
      Reflect.ownKeys(initializer).forEach(child => this.get(`${key}.${child}`))
      const value = getValue(key);
      this.cache[key] = value;
      return value;
    }

    if (initializer.type === 'value') {
      return setValue(key, initializer.value);
    }

    const inject = initializer.inject || [];
    const deps = inject.map(key => this.get(key));

    let instance;
    if (initializer.type === 'ctor') {
      instance = new initializer.ctor(...deps)
      setValue(key, instance);
    }

    if (initializer.type === 'factory') {
      instance = initializer.factory(...deps);
      return setValue(key, instance);
    }

    if (initializer.setter) {
      for (const depToSet of initializer.setter) {
        const [dep, setter] = depToSet;
        instance[setter].call(instance, this.get(dep));
      }
    }

    return instance;
  }
}

export {
  DiliteError,
  Container,

  ctor,
  factory,
  value,
};

export default Container;
