/* Main app */
$(function() {
  /* IE polyfill */
  if (typeof console === "undefined") {
    console = {};
    console.log = function() {
      return;
    };
  }
  /* Begin data */
  // BCSH indications
  /*
    Data fields and their uses:

    title = Used as heading.
    key = Used to refer to entry, no displayed.
    definition = Used to explain title keywords, include reference.
    type = Overall recommendation, one of the following:
    -irradiated-cmv
    -irradiated
    -cmv
    -normal (special component not required)
    tags = used for indications search. Otherwise not visible.
    category = Used to group in indications list.
    checklist = Used to group for checklist.
    recommendation = Object holding guidelines and source:
    -type = the kind of indication the text relates to
    -text = a summary of the recommendation
    -verbatim = quote from the guidelines.
    -reference = id of source (see reference page for id)

  */
  var components = {
    "entries": [{
      "title": "Blood from a relative of the patient",
      "key": "relative",
      "definition": "",
      "type": "irradiated",
      "category": "component",
      "checklist": "",
      "tags": "blood component, directed donation, maternal blood, graft versus host disease, gvhd, ta-gvhd, family, mother, father, child, blood relation",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All transfusions from <a href=\"javascript: showWord('relatives')\" class=\"definition\">first- or second-degree relatives</a> should be irradiated, even if the patient is immunocompetent (1B).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Granulocytes",
      "key": "granulocytes",
      "definition": "\"Some clinicians believe that some patients with very low neutrophil counts and intractable sepsis can benefit from infusion of granulocyte concentrates. These may be prepared either by apheresis collections or derived from whole blood. [...] Clinical trials have not so far established effectiveness of the treatment\" <a href=\"javascript:showSource('htm2007')\" class=\"reference\">HTM 2007, p. 12<\/a>.",
      "type": "irradiated-cmv",
      "category": "component",
      "tags": "leukocytes, leucocytes, white cells, leucopenia, leukopenia, leukocytopenia, leucocytopenia, neutrophil, neutropaenia, neutropoenia, neutropenia, granolucyte, graft versus host disease, gvhd, ta-gvhd, cmv, cytomegalovirus, blood component",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All granulocyte transfusions should be irradiated for recipients of any age, and they should be transfused  soon as possible after irradiation. (1C).",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "As granulocytes cannot be <a href=\"javascript: showWord('leucodepletion')\" class=\"definition\">leucodepleted<\/a> and is usually given to immunocompromised patients, it is essential that the product be irradiated prior to transfusion to avoid graft-versus-host disease.",
        "reference": "ukbts2012"
      }, {
        "type": "cmv",
        "verbatim": "Granulocyte components should continue to be provided as CMV seronegative for CMV seronegative patients.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Human Leucocyte Antigen (HLA)-selected components",
      "key": "hla",
      "type": "irradiated",
      "category": "component",
      "tags": "refractory, hla-matched, antigen, hla-compatible, homozygous, hla-selected, haplotype, genetic, chromosome, graft versus host disease, gvhd, ta-gvhd, blood component",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All human leucocyte antigen (HLA)-selected components should be irradiated, even if the patient is immunocompetent (2C).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Fresh frozen plasma, cryoprecipitate or plasma derivative",
      "key": "plasma",
      "definition": "\"Blood is a raw material from which different therapeutic products are made. These are blood components (red cell concentrates, platelet concentrates, fresh plasma and cryoprecipitate) and plasma derivatives (albumin, coagulation factors and immunoglobulins)\" <a href=\"javascript:showSource('htm2007')\" class=\"reference\">HTM 2007, p. 5<\/a>.",
      "type": "normal",
      "category": "component",
      "tags": "ffp, cryoprecipitate, fresh frozen plasma, non-cellular component, fractionated plasma, immunoglobulin, albumin, coagulation factors, clotting factors, fresh plasma, blood plasma, blood component",
      "recommendation": [{
        "type": "irradiated",
        "text": "It is not necessary to irradiate fresh frozen plasma, cryoprecipitate or fractionated plasma.",
        "verbatim": "For at-risk patients, all red cell, platelet and granulocyte components should be irradiated, except cryopreserved red cells after deglycerolization. It is not necessary to irradiate fresh frozen plasma, cryoprecipitate or fractionated plasma. (1B).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "CMV infection is associated with cellular blood components, such as red cells, platelets and granulocytes. Non-cellular components, such as fresh frozen plasma, cryoprecipitate and other plasma-derived blood components, do not need to be provided as CMV negative.",
        "verbatim": "Cell-associated viruses such as CMV and HTLV do not pose a risk to plasma-derived products.",
        "reference": "htm2007"
      }]
    }, {
      "title": "Red cells or platelets",
      "key": "redcellsplatelets",
      "definition": "\"Red cell transfusion is indicated to increase the oxygen delivering capacity of the blood when acute or chronic anaemia contributes to inadequate oxygen delivery to tissues\" <a href=\"javascript:showSource('htm2007')\" class=\"reference\">HTM 2007, p.7<\/a>. \"Platelet transfusions are indicated for the prevention and treatment of haemorrhage in patients with thrombocytopenia or platelet function defects\" <a href=\"javascript:showSource('htm2007')\" class=\"reference\">HTM 2007, p.8<\/a>.",
      "type": "maybe",
      "category": "component",
      "tags": "haemoglobin, platelets, anaemia, anemia, thrombocytopenia, haemorrhage, bleeding, blood component, cryopreserved red cells after deglycerolizationm red cells",
      "recommendation": [{
        "type": "irradiated",
        "text": "Red cells and platelets contain lymphocytes (white cells) that can cause transfusion-associated Graft versus Host Disease (TA-GvHD). Cryopreserved red cells after deglycerolization do not require irradiation because they are washed free of leucocytes. Irradiated platelets and red cells are only indicated for at-risk patients. Please consult <a href=\"#list\" class=\"definition\">the list of indications</a>.",
        "verbatim": " For at-risk patients, all red cell, platelet and granulocyte components should be irradiated, except cryopreserved red cells after deglycerolization. It is not necessary to irradiate fresh frozen plasma, cryoprecipitate or fractionated plasma. (1B).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "verbatim": " CMV seronegative red cell and platelet components should be provided for intra-uterine transfusions and for neonates (ie up to 28 days post expected date of delivery), and therefore all small sized blood packs and other cellular blood components intended for neonates should be provided as CMV seronegative.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "verbatim": "CMV seronegative red cell and platelet components should be provided for elective transfusions during pregnancy (not during delivery) regardless of maternal CMV serostatus.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "verbatim": "If, in an emergency situation, it is not possible to provide CMV negative blood products, leucodepleted products of unknown serostatus may be used.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "verbatim": " All blood components (other than granulocytes) in the UK now undergo leucodepletion, which provides a significant degree of CMV risk reduction. This measure is considered adequate risk reduction for all other patients requiring transfusion (haemopoetic stem cell transplant patients, organ transplant patients, and immune deficient patients, including those with HIV) without the requirement for CMV seronegative components in addition.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Purine analogue drugs",
      "key": "purineanalogues",
      "definition": "Purine analogues includes drugs such as fludarabine, cladribine, bendamustine, clofarabine, deoxycoformycin, thioguanine, pentastatin and cladribine. This list is not exhaustive and may change as new drugs become available.",
      "type": "irradiated",
      "category": "drug",
      "tags": "chemotherapy, fludarabine, cladribine, deoxycoformycin, thioguanine, pentastatin and cladribine, drug, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, alemtuzumab, campath, anti-cd52, graft versus host disease, gvhd, ta-gvhd, cancer",
      "recommendation": [{
        "type": "irradiated",
        "text": "Patients treated with purine analogue drugs (fludarabine, cladribine and deoxycoformicin) and purine antagonists (such as bendamustine and clofarabine) should receive irradiated blood components indefinitely. Recommendations may change as new drugs become available. See also entries for Alemtuzumab (Campath) and anti-thymocyte globulin (ATG)",
        "verbatim": "Patients treated with purine analogue drugs (fludarabine, cladribine and deoxycoformicin) should receive irradiated blood components indefinitely (1B). The situation with other purine antagonists and new and related agents, such as bendamustine and clofarabine, is unclear, but use of irradiated blood components is recommended as these agents have a similar mode of action. Irradiated blood components should be used after alemtuzumab (anti-CD52) therapy. Their use after rituximab (anti-CD20) is not recommended at this time. As new potent immunosupressive drugs and biological agents are introduced into practice there is a need for regular review of these recommendations (2C).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Campath (Alemtuzumab)",
      "key": "campath",
      "type": "irradiated",
      "category": "drug",
      "tags": "drug, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, alemtuzumab, campath, anti-cd52, graft versus host disease, gvhd, ta-gvhd, cancer",
      "recommendation": [{
        "type": "irradiated",
        "text": "Patients treated with Alemtuzumab (anti-CD52 or Campath) should receive irradiated blood components.",
        "verbatim": "Patients treated with purine analogue drugs (fludarabine, cladribine and deoxycoformicin) should receive irradiated blood components indefinitely (1B). The situation with other purine antagonists and new and related agents, such as bendamustine and clofarabine, is unclear, but use of irradiated blood components is recommended as these agents have a similar mode of action. Irradiated blood components should be used after alemtuzumab (anti-CD52) therapy. Their use after rituximab (anti-CD20) is not recommended at this time. As new potent immunosupressive drugs and biological agents are introduced into practice there is a need for regular review of these recommendations (2C).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Anti-thymocyte globulin (ATG)",
      "key": "atg",
      "type": "irradiated",
      "category": "drug",
      "tags": "drug, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, cancer, Anti-thymocyte globulin, ATG, horse, rabbit",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "In view of the recent switch from horse anti-thymocyte globulin (ATG) to the more immunosuppressive rabbit ATG, we now recommend use of irradiated blood components for aplastic anaemia patients receiving immunosuppressive therapy with ATG (and/or alemtuzumab) (2C). We cannot make a firm recommendation as to how long irradiated components should continue to be used after ATG administration.",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Hodgkin lymphoma",
      "definition": "\"A malignant disease characterized by progressive enlargement of the lymph nodes, spleen, and general lymphoid tissue. In the classical variant, giant usually multinucleate Hodgkin's and reed-sternberg cells are present; in the nodular lymphocyte predominant variant, lymphocytic and histiocytic cells are seen\" <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "key": "hodgin",
      "type": "irradiated",
      "category": "condition",
      "tags": "Hodgkin, hodkin, Hodgekin lymphoma, Hodgekin disease, current or history of medical condition, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, cancer",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All adults and children with Hodgkin lymphoma at any stage of the disease should have irradiated red cells and platelets for life (1B).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Severe T lymphocyte immunodeficiency",
      "definition": "There are a long list of rare primary congenital or secondary acquired immunodeficiencies which may be an indication for irradiation: SCID, Di George syndrome, Wiskott Aldrich syndrome, reticular dysgnesis, ADA deficiency, chronic mucosal candidiasis, MHC class 1 or 2 deficiency. Seek expert immunologist advice.",
      "key": "immunodeficiency",
      "type": "irradiated",
      "category": "condition",
      "tags": "congenital, hereditary, cell-mediated, SCID, severe combined immunodeficiency, DiGeorge, Di George syndrome, Wiskott Aldrich syndrome, reticular dysgnesis, ADA deficiency, chronic mucosal candidiasis, MHC class 1 or 2 deficiency, current or history of medical condition, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All severe T lymphocyte immunodeficiency syndromes should be considered as indications for irradiation of cellular blood components.",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "Once a diagnosis of immunodeficiency has been suspected, irradiated components should be given while further diagnostic tests are being undertaken.",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "A clinical immunologist should be consulted for advice in cases where there is uncertainty (1A).",
        "reference": "bcsh2010"
      }, {
        "text": "Leucodepletion is considered adequate CMV risk reduction for immunodeficient patients and there is no requirement for CMV negative components in addition.",
        "verbatim": "No relevant literature was found that supported the use of CMV seronegative blood for immunodeficient patients. These patients should receive leucodepleted blood. All blood components (other than granulocytes) in the UK now undergo leucodepletion, which provides a significant degree of CMV risk reduction. This measure is considered adequate risk reduction for all other patients requiring transfusion (haemopoetic stem cell transplant patients, organ transplant patients, and immune deficient patients, including those with HIV) without the requirement for CMV seronegative components in addition.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Polymerase chain reaction (PCR) monitoring should be considered to detect signs of CMV infection early.",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Aplastic anaemia receiving ATG or Campath",
      "defintion": "A form of anemia in which the bone marrow fails to produce adequate numbers of peripheral blood elements <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "key": "aplastic",
      "type": "irradiated",
      "category": "condition",
      "tags": "aplastic anaemia, anemia, current or history of medical condition, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, haemoglobinopathy",
      "recommendation": [{
        "type": "irradiated",
        "text": "Use of irradiated blood components is recommended for aplastic anaemia patients receiving immunosuppressive therapy with anti-thymocyte globulin (ATG) or Campath (alemtuzumab).",
        "verbatim": "In view of the recent switch from horse anti-thymocyte globulin (ATG) to the more immunosuppressive rabbit ATG, we now recommend use of irradiated blood components for aplastic anaemia patients receiving immunosuppressive therapy with ATG (and/or alemtuzumab) (2C). We cannot make a firm recommendation as to how long irradiated components should continue to be used after ATG administration.",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "HIV, AIDS or other common viral infection",
      "key": "hiv",
      "type": "normal",
      "category": "condition",
      "tags": "aids, hiv, virus, current or history of medical condition, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd",
      "recommendation": [{
        "type": "irradiated",
        "text": "Irradiated components are not indicated for common viral infections, HIV or AIDS.",
        "verbatim": "There is no indication for routine irradiation of cellular blood components for infants or children who are suffering from a common viral infection, who are human immunodeficiency virus (HIV) antibody positive, or who have acquired immunodeficiency syndrome (AIDS). However, this should be kept under review. There is also no indication for routine irradiation of cellular blood components for adults who are HIV antibody positive or who have AIDS (2B).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "Leucodepletion is considered adequate CMV risk reduction for patients with HIV or AIDS and there is no requirement for CMV negative blood components in addition.",
        "verbatim": "All blood components (other than granulocytes) in the UK now undergo leucodepletion, which provides a significant degree of CMV risk reduction. This measure is considered adequate risk reduction for all other patients requiring transfusion (haemopoetic stem cell transplant patients, organ transplant patients, and immune deficient patients, including those with HIV) without the requirement for CMV seronegative components in addition.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Polymerase chain reaction (PCR) monitoring should be considered to detect signs of CMV infection early.",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Leukaemia",
      "id": "leukaemia",
      "definition": "\"A progressive, malignant disease of the blood-forming organs, characterized by distorted proliferation and development of leukocytes and their precursors in the blood and bone marrow. Leukemias were originally termed acute or chronic based on life expectancy but now are classified according to cellular maturity. Acute leukemias consist of predominately immature cells; chronic leukemias are composed of more mature cells\" <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "type": "normal",
      "category": "condition",
      "tags": "leukaemia, leucaemia, leucemia, leukemia, current or history of medical condition, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, cancer, malignancy, malignant, leukocyte, leucocyte",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "It is not necessary to irradiate red cells or platelets for adults or children with acute leukaemia, except for HLA-selected platelets or donations from <a href=\"javascript: showGlossary('relatives')\" class=\"glossary\">first- or second-degree relatives</a> (1B).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "verbatim": "Patients requiring transfusions who may require a transplant in the future may also safely be transfused with leucodepleted products (eg seronegative leukaemia or thalassaemia patients).",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Polymerase chain reaction (PCR) monitoring should be considered to detect signs of CMV infection early.",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Transfusions during pregnancy",
      "key": "pregnancy",
      "type": "cmv",
      "category": "neonatology",
      "tags": "neonatal, neonatology, obstetrics, pregnancy, fetus, neonate, fetal, infant, birth, delivery, intrauterine transfusion, exchange transfusion, uterine, cmv, cytomegalovirus, mother, maternal",
      "recommendation": [{
        "type": "cmv",
        "verbatim": "CMV seronegative red cell and platelet components should be provided for elective transfusions during pregnancy (not during delivery) regardless of maternal CMV serostatus.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "verbatim": "If, in an emergency situation, it is not possible to provide CMV negative blood products, leucodepleted products of unknown serostatus may be used.",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Neonatal alloimmune thrombocytopenia",
      "id": "neonate",
      "definition": "\"A condition in newborns caused by immunity of the mother to platelet alloantigens on the fetal platelets. The platelets, coated with maternal antibodies, are destroyed and removed by the fetal mononuclear phagocyte system. Affected infants may have intracranial haemorrhages\" <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "type": "irradiated-cmv",
      "category": "neonatology",
      "tags": "current or history of medical condition, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, neonatal, neonatology, obstetrics, alloimmune thrombocytopenia, newborn, platelets, fetal, infants, haemorrhage, baby, NAIP",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "Platelets transfused in utero to treat alloimmune thrombocytopenia should be irradiated and any subsequent red cell or platelet transfusions irradiated until 6 months after the expected date of delivery (40 weeks gestation). ",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "For intrauterine transfusion (IUT) and exchange transfusion (ET), blood should be transfused within 24 h of irradiation and, in any case, by 5 days or less from collection (1A).",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "text": "There is no need to irradiate platelets for pre-term or term infants, unless it has been donated by relatives or newborn has had previous in utero transfusion.",
        "verbatim": "There is no need to irradiate other platelet transfusions for pre-term or term infants, unless they have been donated by <a href=\"javascript: showGlossary('relatives')\" class=\"glossary\">first- or second-degree relatives</a> (1C).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "CMV negative blood components should be provided for neonates.",
        "verbatim": "CMV seronegative red cell and platelet components should be provided for intra-uterine transfusions and for neonates (ie up to 28 days post expected date of delivery), and therefore all small sized blood packs and other cellular blood components intended for neonates should be provided as CMV seronegative.",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Intrauterine transfusions (IUT)",
      "definition": "\"In utero transfusion of blood into the fetus for the treatment of fetal diseases, such as fetal erythroblastosis\" <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "key": "iut",
      "type": "irradiated-cmv",
      "category": "neonatology",
      "tags": "HDN, haemolytic disease of the newborn, NAITP , neonatal alloimmune thrombocytopenia, neonatal, neonatology, obstetrics, pregnancy, fetus, neonate, fetal, infant, birth, delivery, in utero, intra uterine, intra-uterine, intrauterine transfusion, exchange transfusion, uterine, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, cmv, cytomegalovirus, infection",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All blood for intrauterine transfusion (IUT) should be irradiated (1B).",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "For IUT and exchange transfusion (ET), blood should be transfused within 24 h of irradiation and, in any case, by 5 days or less from collection (1A).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "CMV negative blood components should be provided for intrauterine transfusions.",
        "verbatim": "CMV seronegative red cell and platelet components should be provided for intra-uterine transfusions and for neonates (ie up to 28 days post expected date of delivery), and therefore all small sized blood packs and other cellular blood components intended for neonates should be provided as CMV seronegative.",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Neonatal exchange transfusions",
      "key": "exchange",
      "definition": "\"Repetitive withdrawal of small amounts of blood and replacement with donor blood until a large proportion of the blood volume has been exchanged\" <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "type": "irradiated-cmv",
      "category": "neonatology",
      "tags": "neonatal, neonatology, obstetrics, pregnancy, neonate, infant, birth, delivery, exchange transfusion, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, cmv, cytomegalovirus, infection",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "Blood for neonatal exchange transfusion (ET) must be irradiated if there has been a previous intrauterine transfusion (IUT) or if the donation comes from a first- or second-degree relative. (1B)",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "For other neonatal ET cases, irradiation is recommended provided this does not unduly delay transfusion (1C).",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "For intrauterine transfusion (IUT) and ET, blood should be transfused within 24 h of irradiation and, in any case, by 5 days or less from collection (1A).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "CMV negative blood components should be provided for neonates.",
        "verbatim": "CMV seronegative red cell and platelet components should be provided for intra-uterine transfusions and for neonates (ie up to 28 days post expected date of delivery), and therefore all small sized blood packs and other cellular blood components intended for neonates should be provided as CMV seronegative.",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Routine infant 'top-up'",
      "definition": "An infant is defined as a child between 1 and 23 months of age <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "key": "top-up",
      "type": "maybe",
      "category": "neonatology",
      "tags": "infant, neonatology, top up, transfusion, routine",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "It is not necessary to irradiate red cells for routine 'top-up' transfusions of premature or term infants unless either there has been a previous intrauterine transfusion (IUT), in which case irradiated components should be administered until 6 months after the expected delivery date (40 weeks gestation), or the donation has come from a first- or second-degree relative (2C).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Infant cardiac surgery",
      "key": "surgery",
      "definition": "An infant is defined as a child between 1 and 23 months of age <a href=\"javascript:showSource('mesh2013')\" class=\"reference\">MESH 2013<\/a>.",
      "type": "maybe",
      "category": "neonatology",
      "tags": "cardiac, heart, operation, surgery, obstetrics, paediatrics, pediatrics, neonatology, infant",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "There is no need to irradiate red cells or platelets for infants undergoing cardiac surgery unless clinical or laboratory features suggest a coexisting T lymphocyte immunodeficiency syndrome (2B).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Allogeneic haemopoietic stem cell transplant recipients",
      "definition": "Recipient of stem cells donated by a genetically non-identical donor.",
      "key": "stemcell",
      "type": "irradiated",
      "category": "transplant",
      "tags": "HSC, stem cells, transplant, allogeneic, haemopoietic, oncology, immunosuppressive, immune system, immunocompromised, immunodeficiency, immunodeficient, graft versus host disease, gvhd, ta-gvhd, chemoradiotherapy",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All recipients of allogeneic haemopoietic stem cell transplantation (HSCT) must receive irradiated blood components from the time of initiation of conditioning chemoradiotherapy (1B).",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "This should be continued while the patient continues to receive graft-versus-host disease (GvHD) prophylaxis, i.e. usually for 6 months post-transplant, or until lymphocytes are > 1 x 10^9/l. If chronic GvHD is present or if continued immunosuppressive treatment is required, irradiated blood components should be given indefinitely (2C).",
        "reference": "bcsh2010"
      }, {
        "type": "irradiated",
        "verbatim": "Allogeneic blood transfused to bone marrow and peripheral blood stem cell donors 7 days prior to or during the harvest should also be irradiated (2C).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "Leucodepletion provides adequate risk reduction for patients undergoing haemopoietic stem cell transplant.",
        "verbatim": "CMV seronegative red cells and platelets may be replaced with leucodepleted blood components for adults and children post haemopoeitic stem cell transplantation, for all patient groups including seronegative donor/seronegative recipients.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Polymerase chain reaction (PCR) monitoring should be considered to detect signs of CMV infection early.",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Patients who may require a transplant in the future do not require CMV seronegative blood.",
        "verbatim": "Patients requiring transfusions who may require a transplant in the future may also safely be transfused with leucodepleted products (eg seronegative leukaemia or thalassaemia patients).",
        "reference": "sabto2012"
      }]
    }, {
      "title": "Autologous bone marrow or stem cell harvest",
      "definition": "In autologous stem cell transplantation stem cells are removed, stored, and later given back to the same person.",
      "key": "harvest",
      "type": "irradiated",
      "category": "transplant",
      "tags": "Autologous, harvest, transplant, stem cell, bone marrow, PBSC, GvHD, graft versus host disease, peripheral blood stem cell",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "Patients undergoing bone marrow or peripheral blood stem cell harvesting for future autologous re-infusion should receive irradiated cellular blood components during and for 7 days before the bone marrow/stem cell harvest to prevent the collection of viable allogeneic T lymphocytes which can potentially withstand cryopreservation (2C).",
        "reference": "bcsh2010"
      }]
    }, {
      "title": "Autologous bone marrow or stem cell transplant",
      "definition": "In autologous stem cell transplantation stem cells are removed, stored, and later given back to the same person.",
      "key": "transplant",
      "type": "irradiated",
      "category": "transplant",
      "tags": "Autologous, transplant, stem cell, bone marrow, PBSC, GvHD, graft versus host disease, peripheral blood stem cell",
      "recommendation": [{
        "type": "irradiated",
        "verbatim": "All patients undergoing autologous bone marrow transplant or peripheral blood stem cell transplant should receive irradiated cellular blood components from initiation of conditioning chemo/radiotherapy until 3 months post-transplant (6 months if total body irradiation was used in conditioning) (2C).",
        "reference": "bcsh2010"
      }, {
        "type": "cmv",
        "text": "Leucodepletion provides adequate risk reduction for patients undergoing haemopoietic stem cell transplant.",
        "verbatim": "CMV seronegative red cells and platelets may be replaced with leucodepleted blood components for adults and children post haemopoeitic stem cell transplantation, for all patient groups including seronegative donor/seronegative recipients.",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Polymerase chain reaction (PCR) monitoring should be considered to detect signs of CMV infection early.",
        "verbatim": "CMV PCR monitoring should be considered for all patients (even CMV negative/negative patients) to allow early detection of any possible CMV infection (whether transfusion-transmitted or otherwise acquired).",
        "reference": "sabto2012"
      }, {
        "type": "cmv",
        "text": "Patients who may require a transplant in the future do not require CMV seronegative blood.",
        "verbatim": "Patients requiring transfusions who may require a transplant in the future may also safely be transfused with leucodepleted products (eg seronegative leukaemia or thalassaemia patients).",
        "reference": "sabto2012"
      }]
    }]
  };
  /* jQuery Mobile panel setup */
  $("body>[data-role='panel']").panel().trigger('create');
  /* Event handlers */
  
  // generate indications table
  
  $(document).on("pageinit", "#indications", function() {
    
    $.each(components.entries, function(i, item) {
      var titlecode = '<td data-value="' + (i+1) + '">' + (i+1) + '. ' + item.title + '</td>';
      
      var irrcode = '<td data-value="-1" class="not-required">Irradiated not required.</td>';
      var cmvcode = '<td data-value="-1" class="not-required">CMV-negative not required.</td>';
      
      var irrtext = '';
      var cmvtext = '';
      
      switch (item.type) {
        case 'irradiated-cmv':
          irrcode = '<td data-value="1" class="required">Irradiation required.</td>';
          cmvcode = '<td data-value="1" class="required">CMV-negative required.</td>';
        break;
        case 'irradiated':
          irrcode = '<td data-value="1" class="required">Irradiation required.</td>';
          cmvcode = '<td data-value="-1" class="not-required">CMV-negative not required.</td>';
        break;
        case 'cmv':
          irrcode = '<td data-value="-1" class="not-required">Irradiated not required.</td>';
          cmvcode = '<td data-value="1" class="required">CMV-negative required.</td>';
        break;
        case 'maybe':
          irrcode = '<td data-value="0" class="maybe-required">Irradiation may be required.</td>';
          cmvcode = '<td data-value="0" class="maybe-required">CMV-negative may be required.</td>';
        break;
      }
      
      $.each(item.recommendation, function(r, recommendation) {
        if (recommendation.type == 'irradiated') irrtext += '<p>' + recommendation.verbatim + '</p>';
        if (recommendation.type == 'cmv') cmvtext += '<p>'+ recommendation.verbatim+ '</p>';
      });
      
      var details = '<td>';
      if (irrtext) details += '<h4>Irradiation guidance</h4>' + irrtext;
      if (cmvtext) details += '<h4>CMV-negative guidance</h4>' + cmvtext;
      details += '</td>';
      
      $("#indicationstable tbody").append('<tr>' + titlecode+irrcode+cmvcode+details + '</tr>');
      
    });
    
    setTimeout(function() {
      $('.footable').footable();
    }, 300);
  });
  $(".explanation").on("click", function() {
    alert($(this).attr("title"));
  });
  window.onload = function() {
    $("#terms").slideDown('slow');
  }
});