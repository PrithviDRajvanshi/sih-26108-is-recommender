export const demoQuery = "Need mild steel tubes for structural use in a government building construction tender, IS specification required.";

export const demoDocument = {
  name: "Structural_Tender_Spec_MSTubes.pdf",
  size: "2.1 MB",
  type: "Technical Scope of Work",
};

export const demoData = {
  is_number: "IS 1161:2014",
  title: "Steel Tubes for Structural Purposes — Specification (Fifth Revision)",
  status: "Active",
  reaffirmed_year: 2019,
  committee: "MTD 19 (Steel Tubes, Pipes and Fittings Sectional Committee)",
  latest_version_badge: "Latest Version — No pending amendments",
  reasoning: "This standard covers hot-finished welded, seamless, and ERW mild steel tubes for structural applications, matching the tender's requirement for structural mild steel tubes. Tubes are classified Light/Medium/Heavy by wall thickness and graded by yield strength (Y St 210 / 240 / 310).",
  allied_standards: [
    { is_number: "IS 1387", type: "Normative Reference", note: "General requirements for supply of steel tubes" },
    { is_number: "IS 10748", type: "Related Product Standard", note: "Hot rolled steel strip used in tube manufacture" }
  ],
  certifications: [
    { type: "BIS Product Certification (ISI Mark)", mandatory: true, note: "Mandatory under Steel Tubes (Quality Control) Order, 2020" }
  ],
  confidence: "High match",
  ics_code: "ICS 77.140.75",
  parameters: [
    { label: "Application", value: "Structural Framing" },
    { label: "Manufacturing", value: "Seamless / ERW / HFW" },
    { label: "Strength Grades", value: "Y St 210 / 240 / 310" },
    { label: "Thickness Class", value: "Light / Medium / Heavy" }
  ]
};

export default demoData;
