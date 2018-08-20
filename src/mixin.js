export default (...props) => ({
  // creating proxy data for props, with "prop + $" syntax
  data() {
    return props.reduce((data, prop) => {
      data[`${prop}$`] = null
      return data;
    }, {})
  },

  created() {
    // setting default value and watchers for prop proxies
    props.forEach(prop => {
      const prox = `${prop}$`;
      const event = prop === 'value' ? 'input' : 'update:' + prop;

      this[prox] = this[prop];

      this.$watch(prop, (newVal, oldVal) => {
        if (newVal !== this[prox])
          this[prox] = newVal
      }, { deep: true });

      this.$watch(prox, (newVal) => {
        if (newVal !== this[prop]) {
          this.$emit(event, newVal)
        }
      }, { deep: true })
    })
  },
})
