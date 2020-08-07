const inputTypeOptions = [{
  label: 'Fractional Number',
  value: 'fractionalNumber'
},
{
  label: 'Complete Number',
  value: 'completeNumber'
},
{
  label: 'Text (One Line)',
  value: 'textOneline'
},
{
  label: 'Text (Multiline Line)',
  value: 'textMultiline'
},
{
  label: 'Select (One)',
  value: 'selectOne'
},
{
  label: 'Select (Multiple)',
  value: 'selectMultiple'
}]

const filterTypeOptions = [{
  label: 'Less Then or Equals',
  value: 'lte'
}, {
  label: 'Less Then',
  value: 'lt'
}, {
  label: 'Equals',
  value: 'eq'
}, {
  label: 'Greater Then',
  value: 'gt'
}, {
  label: 'Greater Then or Equals',
  value: 'gte'
}]

module.exports = {
  filterTypeOptions,
  inputTypeOptions
}
