﻿/* Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
    See full license at the bottom of this file. */

/// <reference path="../App.js" />

(function () {
    "use strict";

    var sheetCopyNumber = 1;

	// The initialize function must be run each time a new page is loaded
	Office.initialize = function (reason) {
		$(document).ready(function () {
			app.initialize();

			$('#generate-template').button();
			$('#generate-template').click(generateTemplateRange);

			$('#create-csv').button();
			$('#create-csv').click(createCSVStream);
			$('#show-help').click(showHelp);
			$('#selectService').change(selectServiceHandler);

		});
	};

	function selectServiceHandler() {
	    generateTemplateRange(this.value);
	}
	function showHelp() {
	    window.open("HelpPop.html","mywindow","menubar=1,resizable=1,width=800,height=850");

	}
	function generateTemplateRange(selectedService) {
	    // Run a batch operation against the Excel object model
	    Excel.run(function (ctx) {
	        // Run the queued-up commands, and return a promise to indicate task completion
	        // Create a proxy object for the active worksheet

	        var studentRoster = ctx.workbook.worksheets.add("_" + sheetCopyNumber);

	        var rosterName = "";
            //Get user's service choice and build the cooresponding table
	        if ($("input[type='radio']:checked").val() == "Moodle") {
	            buildMoodleRange(studentRoster);
	            rosterName = "MoodleRoster_" + sheetCopyNumber;
            }
	        else {
	            buildTeacherKitRange(studentRoster);
	            rosterName = "TeacherKitRoster_" + sheetCopyNumber;
            }

	        sheetCopyNumber++;

	        return ctx.sync().then(function () {
	            makeActiveSheet(rosterName);
	            app.showNotification("Sheet created");
	        });
	    }).catch(function (error) {
	        // Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
	        app.showNotification("Error: " + error);
	        console.log("Error: " + error);
	        if (error instanceof OfficeExtension.Error) {
	            console.log("Debug info: " + JSON.stringify(error.debugInfo));
	        }
	    });
    }

	function makeActiveSheet(rosterName) {

	    // Run a batch operation against the Excel object model
	    Excel.run(function (ctx) {
	        // Create a proxy object for the worksheets collection 
	        var worksheets = ctx.workbook.worksheets;
	        var table;
	        var headerRange;

	        // Queue a command to get the sheet with the name of the clicked button
	        var clickedSheet = worksheets.getItem(rosterName);
	        clickedSheet.load("tables");
	        return ctx.sync()
                .then(function () {
                    table = clickedSheet.tables.getItemAt(0);
                    table.load("rows");
                })
                .then(ctx.sync)
                .then(function () {
                    headerRange = table.getHeaderRowRange();
                    headerRange.load("values")
                })
                .then(ctx.sync)
                .then(function () {
                    var headers = headerRange.values;
                    for (var i = 0; i < headers.length; i++) {
                        var value = headers[i];
                        for (var j = 0; j < value.length; j++) {
                            if (value[j] == "FIRST NAME") {
                                // Queue a command to insert the sheet name into a cell for easy viewing
                                clickedSheet.getCell(1, 0).values = "Adam";
                            }
                            if (value[j] == "LAST NAME") {
                                // Queue a command to insert the sheet name into a cell for easy viewing
                                clickedSheet.getCell(1, 1).values = "Dunsmuir";
                            }
                            if (value[j] == "EMAIL") {
                                // Queue a command to insert the sheet name into a cell for easy viewing
                                clickedSheet.getCell(1, 2).values = "adamd@patsoldemo6.com";
                            }
                            if (value[j] == "PARENTEMAIL") {
                                // Queue a command to insert the sheet name into a cell for easy viewing
                                clickedSheet.getCell(1, 3).values = "parent@patsoldemo6.com";
                            }
                            if (value[j] == "PARENTPHONE") {
                                // Queue a command to insert the sheet name into a cell for easy viewing
                                clickedSheet.getCell(1, 4).values = "555 111-2222";
                            }
                        }
                    }

                    // Queue a command to activate the clicked sheet
                    clickedSheet.activate();

                })


	        //Run the queued-up commands, and return a promise to indicate task completion
	        return ctx.sync();
	    })
		.catch(function (error) {
		    // Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
		    app.showNotification("Error: " + error);
		    console.log("Error: " + error);
		    if (error instanceof OfficeExtension.Error) {
		        console.log("Debug info: " + JSON.stringify(error.debugInfo));
		    }
		});
	}



    function buildMoodleRange( studentRoster) {

        // Create a proxy object for the active worksheet
         studentRoster.name = "MoodleRoster_" +sheetCopyNumber;

        // Queue a command to add a new table
        var table = studentRoster.tables.add('A1:D2', true);
        table.name = "moodelRosterTable_"+sheetCopyNumber;

        // Queue a command to get the newly added table
        table.getHeaderRowRange().values = [["ACTION", "ROLE", "USER ID NUMBER", "COURSE ID NUMBER"]];
        table.style = "TableStyleLight20";
    }

    function buildTeacherKitRange(studentRoster) {
        // Create a proxy object for the active worksheet
        studentRoster.name = "TeacherKitRoster_" + sheetCopyNumber;
  
        // Queue a command to add a new table
        var table = studentRoster.tables.add('A1:E2', true);
        table.name = "teacherKitRosterTable_" + sheetCopyNumber;

        // Queue a command to get the newly added table
        table.getHeaderRowRange().values = [["FIRST NAME", "LAST NAME", "EMAIL", "PARENTEMAIL", "PARENTPHONE"]];
        table.style = "TableStyleLight21";
    }
 
    function createCSVStream() {
        Excel.run(function (ctx) {
            var range = ctx.workbook.worksheets.getActiveWorksheet().getUsedRange();
            range.load("values");
            return ctx.sync()
                .then(function () {
                    var CSVString = "";

                    //Iterate the rows in the range
                    for (var i = 0; i < range.values.length; i++) {
                        var value = range.values[i];

                        //Iterate the cells in a row
                        for (var j = 0; j < value.length; j++) {
                            //Append a value and comma
                            CSVString = CSVString + value[j] + ",";
                        }

                        //strip the trailing ','
                        CSVString = CSVString.substr(0, CSVString.length - 1);

                        //append CRLF
                        CSVString = CSVString + "\r\n";
                    }
                    app.showNotification(CSVString);
                })
        });
    }
    
	
	/********************/
    /* Helper functions */
    /********************/

 
})();

/* 
Excel-Add-in-Generate-CSV, https://github.com/OfficeDev/Excel-Add-in-Generate-CSV

Copyright (c) Microsoft Corporation

All rights reserved.

MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
*/