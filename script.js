/* =================================================
   CLEANROUTE - COMPLETE JAVASCRIPT
   ================================================= */


/* =================================================
   BIN DATA
   ================================================= */

const bins = [
    {
        id: "BIN-001",
        location: "Sector 1",
        fill: 95,
        type: "General"
    },
    {
        id: "BIN-002",
        location: "Sector 2",
        fill: 72,
        type: "General"
    },
    {
        id: "BIN-003",
        location: "Sector 3",
        fill: 45,
        type: "Recyclable"
    },
    {
        id: "BIN-004",
        location: "Sector 4",
        fill: 88,
        type: "General"
    },
    {
        id: "BIN-005",
        location: "Sector 5",
        fill: 30,
        type: "Recyclable"
    },
    {
        id: "BIN-006",
        location: "Sector 6",
        fill: 97,
        type: "General"
    },
    {
        id: "BIN-007",
        location: "Sector 7",
        fill: 63,
        type: "Organic"
    },
    {
        id: "BIN-008",
        location: "Sector 8",
        fill: 91,
        type: "General"
    }
];


/* =================================================
   BIN MONITORING
   ================================================= */

function loadBins() {

    const table = document.getElementById("binTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    bins.forEach(function(bin) {

        let priority = "Normal";
        let status = "Normal";

        if (bin.fill >= 90) {
            priority = "Critical";
            status = "Critical";
        }
        else if (bin.fill >= 70) {
            priority = "High";
            status = "High";
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${bin.id}</strong>
            </td>

            <td>
                📍 ${bin.location}
            </td>

            <td>
                <div class="fill-container">

                    <div class="progress">
                        <div
                            class="progress-bar"
                            style="width:${bin.fill}%">
                        </div>
                    </div>

                    ${bin.fill}%

                </div>
            </td>

            <td>
                ${bin.type}
            </td>

            <td>
                <span class="priority-${priority.toLowerCase()}">
                    ${priority}
                </span>
            </td>

            <td>
                <span class="status status-${status.toLowerCase()}">
                    ${status}
                </span>
            </td>
        `;

        table.appendChild(row);

    });
}


/* =================================================
   REFRESH BIN DATA
   ================================================= */

function refreshData() {

    bins.forEach(function(bin) {

        const change =
            Math.floor(Math.random() * 5) - 2;

        bin.fill = Math.max(
            0,
            Math.min(
                100,
                bin.fill + change
            )
        );

    });

    loadBins();
    updateDashboard();
}


/* =================================================
   DASHBOARD
   ================================================= */

function updateDashboard() {

    const totalBinsElement =
        document.getElementById("totalBins");

    const criticalBinsElement =
        document.getElementById("criticalBins");

    const needCollectionElement =
        document.getElementById("needCollection");

    const averageFillElement =
        document.getElementById("averageFill");


    if (!totalBinsElement) {
        return;
    }


    let critical = 0;
    let needCollection = 0;
    let totalFill = 0;


    bins.forEach(function(bin) {

        totalFill += bin.fill;

        if (bin.fill >= 90) {
            critical++;
        }

        if (bin.fill >= 70) {
            needCollection++;
        }

    });


    const average =
        Math.round(totalFill / bins.length);


    totalBinsElement.textContent =
        bins.length;

    criticalBinsElement.textContent =
        critical;

    needCollectionElement.textContent =
        needCollection;

    averageFillElement.textContent =
        average + "%";
}


/* =================================================
   SMART ROUTE
   ================================================= */

function generateRoute() {

    const selectedLocations =
        document.querySelectorAll(
            ".location-option input:checked"
        );


    /* If the checkbox version exists */

    if (selectedLocations.length > 0) {

        const routeResult =
            document.getElementById("routeResult");

        const routeList =
            document.getElementById("routeList");

        const routeMessage =
            document.getElementById("routeMessage");


        if (routeResult && routeList) {

            routeList.innerHTML = "";

            selectedLocations.forEach(
                function(location, index) {

                    const stop =
                        document.createElement("div");

                    stop.className =
                        "route-stop";

                    stop.textContent =
                        "🚛 Stop " +
                        (index + 1) +
                        ": " +
                        location.value;

                    routeList.appendChild(stop);

                }
            );


            if (routeMessage) {

                routeMessage.textContent =
                    "✅ Smart route generated successfully for " +
                    selectedLocations.length +
                    " collection points.";

            }

            routeResult.style.display =
                "block";
        }

        return;
    }


    /* Original CleanRoute route system */

    const collectionBins =
        bins
            .filter(function(bin) {
                return bin.fill >= 70;
            })
            .sort(function(a, b) {
                return b.fill - a.fill;
            });


    const distance =
        (collectionBins.length * 1.7)
        .toFixed(1);


    const time =
        collectionBins.length * 6 + 2;


    const routeBins =
        document.getElementById("routeBins");

    const routeDistance =
        document.getElementById("routeDistance");

    const routeTime =
        document.getElementById("routeTime");


    if (routeBins) {
        routeBins.textContent =
            collectionBins.length;
    }

    if (routeDistance) {
        routeDistance.textContent =
            distance;
    }

    if (routeTime) {
        routeTime.textContent =
            time;
    }


    alert(
        "🚛 Smart route generated!\n\n" +
        collectionBins.length +
        " bins need collection.\n\n" +
        "Estimated distance: " +
        distance +
        " km"
    );
}


/* =================================================
   CITIZEN REPORT
   ================================================= */

function setupReportForm() {

    const reportForm =
        document.getElementById("reportForm");


    if (!reportForm) {
        return;
    }


    reportForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const location =
                document.getElementById("location");


            const condition =
                document.getElementById("condition");


            if (location && condition) {

                alert(
                    "✅ Report submitted successfully!\n\n" +
                    "Location: " +
                    location.value +
                    "\nProblem: " +
                    condition.value
                );

            }


            reportForm.reset();

        }
    );
}


/* =================================================
   INITIALIZE EVERYTHING
   ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadBins();

        updateDashboard();

        setupReportForm();

    }
);