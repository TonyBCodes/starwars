$(document).ready(function () {

    //----- global variables-----------------------------------

    function fighter() {
        name = "";
        health = 0;
        attack = 0;
        dechealth = function (x) {
            health -= x;
        };
        incattack = function () {
            attack += 2;
        };
    }

    var emp_fighter = [
        ["Sith Warrior", 96, 18],
        ["Sith Inquisitor", 112, 15],
        ["Imperial Agent", 120, 9],
        ["Bounty Hunter", 108, 7]
    ];

    var rep_fighter = [
        ["Jedi Knight", 100, 12],
        ["Jedi Counselor", 82, 20],
        ["Smuggler", 144, 5],
        ["Trooper", 90, 8]
    ];

    var si;
    var group;
    var player_you;
    var player_opp;
    var selected;


    //----- functions------------------------------------------
    function displayall(x) {

        var team;
        var teamspace;
        var tagname;
        var tagnum;
        var tagident;
        var i;


        if (x === 0) {
            team = emp_fighter;
            teamspace = "#empire";
            tagname = "#emp";

        }
        if (x === 1) {
            team = rep_fighter;
            teamspace = "#republic";
            tagname = "#rep";

        }

        for (i = 0; i < 4; i++) {
            tagident = tagname.concat(i + 1);
            $(tagident).text(team[i]);
        }
        selected = false;
     }


    function create_pl1(a, b) {
        player_you = new fighter();
        if (a === "rep") {
            player_you.name = rep_fighter[b][0];
            player_you.health = rep_fighter[b][1];
            player_you.attack = rep_fighter[b][2];
        }
        if (a === "emp") {
            player_you.name = emp_fighter[b][0];
            player_you.health = emp_fighter[b][1];
            player_you.attack = emp_fighter[b][2];
        }
    }

    function create_comp(c, d) {
        player_opp = new fighter();
        if (c === "rep") {
            player_opp.name = rep_fighter[d][0];
            player_opp.health = rep_fighter[d][1];
            player_opp.attack = rep_fighter[d][2];
        }
        if (c === "emp") {
            player_opp.name = emp_fighter[d][0];
            player_opp.health = emp_fighter[d][1];
            player_opp.attack = emp_fighter[d][2];
        }
    }

    function fight() {
        player_you.dechealth(player_opp.attack);
        player_opp.dechealth(player_you.attack);
        player_you.incattack();
    }


    //----- end of functions-----------------------------------

    //----- start----------------------------------------------
    $(window).on("load", function () {

        for (i = 0; i < 2; i++) {
            displayall(i);
        }

        $(document).click(function (event) {

            // pick the players character
            if (selected === false) {
                si = parseInt(event.target.id.charAt(3));
                group = event.target.id.slice(0, 3);
                create_pl1(group, --si);
                if (group === "rep") {
                    $("#republic").hide();
                }
                if (group === "emp") {
                    $("#empire").hide();
                }
                $("#you").text(player_you.name);
                selected = true;
            }

            if (selected === true) {
                $("#" + event.target.id).hide();
                si = parseInt(event.target.id.charAt(3));
                group = event.target.id.slice(0, 3);
                create_comp(group, --si);
                if (player_opp != player_you) {
                    $("#opp").text(player_opp.name);
                }
                $("#" + event.target.id).hide();
            }

            console.log(player_you.name + "   " + player_opp.name)

        });


    });


});