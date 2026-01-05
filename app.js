const API_URL = "https://script.google.com/macros/s/AKfycbwX2O7o8mCjjpnmxgiIO2sduvRNEza2S0BoVHoeoGqMW7QLVgVQLM5r9I9jKTZCBRNI0A/exec";

function loadData() {
  const month = document.getElementById("month").value;

  fetch(`${API_URL}?month=${month}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      // SPM
      const spm = data["spm.csv"];
      const spmViol = spm.filter(r =>
        r["Irregularties found"] &&
        !["NO", "NA"].includes(r["Irregularties found"].toUpperCase())
      ).length;

      // CVVRS
      const cvvrs = data["cvvrs.csv"];
      const cvvrsViol = cvvrs.filter(r =>
        r["Violation Established"] === "YES" ||
        (r["Conclusion"] || "").toUpperCase().includes("VIOLATION")
      ).length;

      // TELOC
      const teloc = data["teloc_daily.csv"];
      const telocViol = teloc.filter(r =>
        r["Result"] === "VIOLATION"
      ).length;

      // BULK
      const bulkTotal = data["bulk_analysis.csv"].length;
      const bulkViol = data["bulk_violation_details.csv"].length;

      document.getElementById("spm").innerHTML =
        `SPM<br>Total: ${spm.length}<br>Violations: ${spmViol}`;

      document.getElementById("cvvrs").innerHTML =
        `CVVRS<br>Total: ${cvvrs.length}<br>Violations: ${cvvrsViol}`;

      document.getElementById("teloc").innerHTML =
        `TELOC<br>Total: ${teloc.length}<br>Violations: ${telocViol}`;

      document.getElementById("bulk").innerHTML =
        `BULK<br>Total: ${bulkTotal}<br>Violations: ${bulkViol}`;
    });
}

