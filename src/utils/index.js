export const HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]

// 策略模式
let starts = {};
/**
 * 如果不处理返回，$options.data返回的是undefined，会导致报错
 * @param {*} parentVal 
 * @param {*} childVal 
 * @returns 
 */
starts.data = function(parentVal, childVal) {
  return childVal;
}; // 合并data
starts.computed = function(){}; // 合并computed
starts.watch = function(){}; // 合并watch
starts.methods = function(){}; // 合并methods

// 遍历生命周期
HOOKS.forEach(hook => {
  starts[hook] = mergeHook;
})

function mergeHook(parentVal, childVal) {
  // { created: [a, b, c], watch: [a,b,c]}
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }
}

/**
 * 合并Vue.mixin的参数 策略模式
 * @param {*} parent 
 * @param {*} child 
 */
export function mergeOptions(parent, child) {
  const options = {};
  // 如果有父亲，没有儿子
  for (let key in parent) {
    mergeField(key);
  }

  // 儿子有父亲没有
  for (let key in child) {
    mergeField(key);
  }

  // 合并生命周期
  function mergeField(key) {
    if (starts[key]) {
      options[key] = starts[key](parent[key], child[key]);
    } else {
      options[key] = child[key];
    }
  }
  return options;
}