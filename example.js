/* eslint-disable camelcase */

const binding = require('.')
const minimist = require('minimist')

var argv = minimist(process.argv.slice(2))

if (!argv.email || !argv.password) {
  console.error('--email and --password required')
  process.exit(1)
}
console.log('Logging in with', argv.email, argv.password)

let dcn_context = binding.dcn_context_new()
console.log('result of dcn_context_new', dcn_context)

let result

result = binding.dcn_set_event_handler(dcn_context, (event, data1, data2) => {
  console.log('this is really js event int', event, data1, data2)
})

result = binding.dcn_open(dcn_context, './test.sqlite', './blobdir')
console.log('result from open:', result)

result = binding.dcn_set_config(dcn_context, 'addr', argv.email)
console.log('result from set_event_handler:', result)

result = binding.dcn_set_config(dcn_context, 'mail_pw', argv.password)
console.log('result from set_event_handler:', result)

result = binding.dcn_is_configured(dcn_context)
console.log('result from is_configured:', result)

result = binding.dcn_configure(dcn_context)
console.log('result from configure:', result)

result = binding.dcn_is_configured(dcn_context)
console.log('result from is_configured:', result)

result = binding.dcn_start_threads(dcn_context)
console.log('result from start_threads:', result)