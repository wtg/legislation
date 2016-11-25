var app = angular.module('MotionBuilder', []);

app.controller('EditMotionController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.ordinal = function (i) {
        var j = i % 10, k = i % 100;

        return i + (j == 1 && k != 11 ? 'st' :
                    (j == 2 && k != 12 ? 'nd' :
                        (j == 3 && k != 13 ? 'rd' : 'th')));
    };

    $scope.getWhereasSeparator = function (i) {
        if(i == $scope.motion.whereasClauses.length - 2) return "; and";

        return ";";
    };

    $scope.getOperativeSeparator = function (i) {
        if(i == $scope.motion.operativeClauses.length - 1) return ".";

        if(i == $scope.motion.operativeClauses.length - 2) return ", and";

        return ",";
    };

    $scope.removeOperative = function (index) {
        $scope.motion.operativeClauses.splice(index, 1);
    };

    $scope.addOperative = function () {
        $scope.motion.operativeClauses.push({ verb: '', clause: '' });
    };

    $scope.removeWhereas = function (index) {
        $scope.motion.whereasClauses.splice(index, 1);
    };

    $scope.addWhereas = function () {
        $scope.motion.whereasClauses.push({ clause: '' });
    };

    $scope.export = function () {
        $http.post('/export', $scope.motion).then(function(response) {
            // const didOpen = $window.open('/export/' + response.data);
            $scope.token = response.data;
        });
    };

    $scope.clearToken = function () {
        delete $scope.token;
    }

    $scope.motion = {
        notVoted: false,
        didPass: true,
        longName: "Rensselaer Union Student Senate",
        shortName: "Student Senate",
        yearName: "Rensselaer Union 47th Student Senate",
        yearNum: 47,
        meetingNum: 1,
        motionNum: 1,
        date: new Date("2016-11-23 UTC-0500"),
        mover: "Justin Etzine",
        moverPosition: "Class of 2018 Senator",
        seconder: "Steve Sperazza",
        seconderPosition: "Class of 2018 Senator",
        votesFavor: 24,
        votesAgainst: 0,
        votesAbstentions: 0,
        whereasClauses: [
            { clause: "the document templates currently used by the Rensselaer Union Student Senate were originally produced in 2009" },
            { clause: "the document templates currently used by the Student Senate do not provide a professional feel for the legislation produced" },
            { clause: "a numerical system for cataloging legislation passed by the Student Senate would assist in ensuring informational continuity" }
        ],
        operativeClauses: [
            { verb: "endorse", clause: "this document as the new format for all legislation passed by the Student Senate" },
            { verb: "recommend", clause: "that the Rensselaer Union Executive Board follows suit by producing a comparable template for legislation passed by that body" },
        ]
    };

    $scope.motion.resolves = "The " + $scope.motion.yearName + " hereby RESOLVES:";



}]);
