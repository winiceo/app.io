/**
 * Created by leven on 17/4/17.
 */

const Parse = require('../app/lib/parse');

// //检测团队
//var Team = Parse.Object.extend("team");
// var team = new Team();
teamId = "lxY48q5WyR"

// //检测团队
//var Team = Parse.Object.extend("team");
// var queryTeam = new Parse.Query(Team);
//
// const myTeam =   queryTeam.get(teamId, {
//     success: function(team) {
//         console.log(team)
//
//         return team
//     },
//     error: function(object, error) {
//         console.log(error)
//         return error
//
//     }
// });
var Team = Parse.Object.extend("team");
var team=new Team();
team.objectId="lxY48q5WyR"
 var queryTeam = new Parse.Query(Team);
const myTeam= queryTeam.get("lxY48q5WeyR",{
    success: function(team) {
        console.log(team)
        return team;
    },
    error: function(team, error) {
        //console.log(error)
        console.log(444)
        return error;
    }
});