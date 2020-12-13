
export default {

  // Instead of having this constantly reevaluated
  // here we define possible values for some of the options
  // we can use these options in subscribe fields
  // so that we dont need to query db to see what are the possible values
  GetDBConstants: function() {
    return {
      tenderTypes: ['Skelbimas apie sutarties skyrimą',
                    'Savanoriškas išankstinis skaidrumo skelbimas',
                    'Skelbimas apie pirkimą',
                    'Išankstinis informacinis pranešimas'],
      tenderClasses: ['darbai', 'paslaugos', 'prekės']
    }

  }
}
