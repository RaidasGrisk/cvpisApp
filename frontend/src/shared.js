
export default {

  // having JSON data and field return unique values
  // getUniqueValuesFromJsonField: function(data, field) {
  //   var lookup = {};
  //   var result = [];
  //
  //   for (let item, i = 0; item = data[i++];) {
  //     if (!(item[field] in lookup)) {
  //       lookup[item[field]] = 1;
  //       result.push(item[field]);
  //     }
  //   }
  //   return result
  // },

  // having array of string dates return oldest and newest dates
  getOldestDate: function(dates) {
    var min_dt = dates[0]
    var max_dt = dates[0]
    var prev_min_dt = new Date(dates[0])
    var prev_max_dt = new Date(dates[0])
    dates.forEach(function(dt){
      // min date
      if (new Date(dt) > prev_min_dt){
        min_dt = dt
        prev_min_dt = new Date(dt)
      }
      // max date
      if (new Date(dt) < prev_max_dt){
        max_dt = dt
        prev_max_dt = new Date(dt)
      }
    })
    return [min_dt, max_dt]
  },

  // given input string make regex string
  getRegexFromSearchString: function(inputStringTender) {
    //  search_string: example '(invest, proj), galim ,(a, b), stud'
    // list of lists where lists with len > 1 are AND conditions, else OR:
    // [['invest', 'proj'], ['galim'], ['a', 'b'], ['stud']]

    var str = inputStringTender
    //eslint-disable-next-line
    str = str.replace(/\s/g, '') // remove spaces
    //eslint-disable-next-line
    var and_pairs = str.match(/\(.*?\)/ig) || [] // match words inside brackets()
    for (let i = 0; i < and_pairs.length; i++) {
      and_pairs[i] = and_pairs[i].replace('(', '').replace(')', '').split(',')
    } // remove brackets and split into array of and conditions

    //eslint-disable-next-line
    var or_pairs = str.replace(/\([^\)]*\)/g, '').match(/(\S+)/g) || ',' // match all outside brackets ()
    or_pairs = or_pairs[0].split(',')
    or_pairs = or_pairs.filter(i => i.length > 0) // remove empty spaces
    for (let i = 0; i < or_pairs.length; i++) {
      or_pairs[i] = [or_pairs[i]]
    } // add each item to array

    var all_pairs = and_pairs.concat(or_pairs)
    var reExpression = ''
    for (const pair in all_pairs) {
      if (all_pairs[pair].length > 1) {
        reExpression += all_pairs[pair].join('.*') + '|'
      } else {
        reExpression += all_pairs[pair].join() + '|'
      }
    }
    reExpression = reExpression.substring(0, reExpression.length - 1)
    // console.log(reExpression)
    // console.log(JSON.stringify(all_pairs))
    // console.log(JSON.stringify(or_pairs))
    // console.log(JSON.stringify(and_pairs))
    return reExpression
  }
}
