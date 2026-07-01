export const hospitals = [
  {
    id: 1,
    slug: 'apollo-delhi',
    name: 'Apollo Hospital Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1576091160550-112173e7f9db?w=800&h=400&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1612349317150-e0a1a03b0c70?w=100&h=100&fit=crop',
    city: 'New Delhi',
    address: 'Sarita Vihar, Delhi Mathura Road, New Delhi, Delhi 110076, India',
    websiteUrl: 'https://delhi.apollohospitals.com',
    rating: 4.8,
    reviews: 324,
    description: 'Leading multi-specialty hospital with state-of-the-art facilities and world-class doctors.',
    beds: 500,
    established: 2000,
    specializations: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology'],
    accreditations: ['JCI', 'NABH'],
    avgCost: { min: 8000, max: 50000 },
    // New requested fields
    icuAvailability: true,
    intlServices: ['Visa Assistance', 'Airport Pick & Drop', 'Language Translators', 'Dedicated International Lounge'],
    departments: ['Cardiology & Cardiothoracic', 'Oncology & Radiation Medicine', 'Orthopedics & Joint Reconstruction', 'Neurology & Neurosurgery', 'Gastroenterology'],
    centresOfExcellence: ['Apollo Heart Institute', 'Indraprastha Cancer Centre', 'Apollo Institute of Orthopedics'],
    treatmentsOffered: ['Coronary Artery Bypass Grafting (CABG)', 'Robotic Prostatectomy', 'Total Knee Replacement', 'Bone Marrow Transplant'],
    blogDescription: `Apollo Hospital Delhi stands out as a premier multi-speciality tertiary care institution, recognized globally for its commitment to clinical excellence and patient safety. Since its establishment, it has continuously integrated advanced therapeutic techniques with a compassionate, human touch. The medical hub extends across multi-acre pristine landscapes, custom-tailored to house high-end diagnostic suites and hyper-specialized care operating theatres. 

    Our internationally trained practitioners lead pioneering research domains across complex cardiology tracks, non-invasive oncological therapeutics, and robotic-assisted laparoscopic surgeries. Over the years, Apollo Delhi has successfully managed tens of thousands of global international travelers through custom treatment programs designed around rapid recovery cycles.

    Equipped with next-generation continuous monitoring modules, a sophisticated level-1 emergency trauma wing, and a comprehensive rehabilitation sanctuary, the infrastructure guarantees premium standardizations at every phase of recovery. The dedicated international care department offers seamless operational support including translation, financial alignment, and tailored cuisine to ensure comfort away from home.`
  },
  {
    id: 2,
    slug: 'max-bangalore',
    name: 'Max Healthcare Bangalore',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1581091918492-8ff080ef951e?w=800&h=400&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1638599810033-ba39fd5faf60?w=100&h=100&fit=crop',
    city: 'Bangalore',
    address: '14, Outer Ring Road, Jayanagar, Bangalore, Karnataka 560011, India',
    websiteUrl: 'https://www.maxhealthcare.in',
    rating: 4.7,
    reviews: 287,
    description: 'Advanced medical center specializing in cardiac and orthopedic surgeries.',
    beds: 400,
    established: 2005,
    specializations: ['Cardiology', 'Orthopedics', 'Neurosurgery', 'Gastroenterology'],
    accreditations: ['JCI', 'ISO'],
    avgCost: { min: 10000, max: 45000 },
    // New requested fields
    icuAvailability: true,
    intlServices: ['International Insurance Coordination', 'Local Tour Guides', 'Teleconsultation Follow-ups'],
    departments: ['Cardiology', 'Orthopedic Surgery', 'Neurology', 'Gastroenterology & Hepatology'],
    centresOfExcellence: ['Max Heart & Vascular Institute', 'Institute of Musculoskeletal Sciences'],
    treatmentsOffered: ['Angioplasty', 'Arthroscopic Knee Resection', 'Deep Brain Stimulation'],
    blogDescription: `Max Healthcare Bangalore ranks as an architectural and medical marvel optimized specifically for intricate surgical operations. Operating under precise JCI healthcare parameters, the facility ensures a stellar success rate across complex procedures like cardiac revascularization, structural joint implants, and comprehensive biological management plans.

    By introducing digital integrated navigation systems in operating theaters, Max Bangalore enables its board-certified surgeons to execute minimally invasive interventions with absolute sub-millimeter tracking. This significantly curtails post-operative stay periods and streamlines recovery workflows.

    The hospital features premier accommodations suited for both long-term clinical stays and accompanying kin. Dedicated wellness coordinators provide persistent support from local transit arrivals to post-discharge recovery monitoring, bridging language and administrative boundaries effortlessly.`
  },
  {
    id: 3,
    slug: 'fortis-hyderabad',
    name: 'Fortis Hospital Hyderabad',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1519494026067-461c37dd7ce5?w=800&h=400&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1622803268553-b1b0f85f7e9f?w=100&h=100&fit=crop',
    city: 'Hyderabad',
    address: 'Road No 2, Jubilee Hills, Hyderabad, Telangana 500034, India',
    websiteUrl: 'https://www.fortishealthcare.com',
    rating: 4.6,
    reviews: 256,
    description: 'Comprehensive healthcare provider with expertise in complex surgeries.',
    beds: 350,
    established: 2008,
    specializations: ['Orthopedics', 'Oncology', 'Neurosurgery', 'Urology'],
    accreditations: ['JCI', 'NABH'],
    avgCost: { min: 9000, max: 48000 },
    // New requested fields
    icuAvailability: true,
    intlServices: ['Language Interpreters', 'Currency Exchange Assistance', 'Customized Diet Plans'],
    departments: ['Orthopedics & Spine', 'Surgical Oncology', 'Neurosurgery', 'Urology & Nephrology'],
    centresOfExcellence: ['Fortis Bone & Joint Institute', 'Cancer Care Centre of Excellence'],
    treatmentsOffered: ['Spine Fusion Surgery', 'Chemotherapy & Target Irradiation', 'Kidney Stone Lithotripsy'],
    blogDescription: `Fortis Hospital Hyderabad is a leading voice in multi-specialty medical delivery systems across Southern India. Celebrated for its aggressive intervention parameters and structural modernization tracks, the facility handles advanced operations with high distinction. 

    The institute features top-tier critical response suites, complex transplant operating zones, and linear accelerator platforms for targeted cellular oncological destruction. Patient safety programs are seamlessly integrated into every shift to maintain excellent clinical outcomes.

    International traveling patients benefit from a streamlined, dedicated medical corridor that coordinates multi-department consultations, direct admissions, and immediate family lodging options, delivering stress-free treatment journeys.`
  },
  {
    id: 4,
    slug: 'american-hospital-dubai',
    name: 'American Hospital Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1516534775068-bb6aaf00db58?w=800&h=400&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1611613535308-eb5fbd8b86b3?w=100&h=100&fit=crop',
    city: 'Dubai',
    address: 'Oud Metha Road, block E, Dubai, United Arab Emirates',
    websiteUrl: 'https://www.ahdubai.com',
    rating: 4.9,
    reviews: 412,
    description: 'Luxury healthcare facility offering premium medical services.',
    beds: 300,
    established: 2002,
    specializations: ['Cardiology', 'Orthopedics', 'IVF', 'Dermatology'],
    accreditations: ['JCI', 'ISO', 'CBAHI'],
    avgCost: { min: 15000, max: 80000 },
    // New requested fields
    icuAvailability: true,
    intlServices: ['Global Concierge Luxury Suites', 'Embassy Coordination', 'Private Nurse Arrangements'],
    departments: ['Interventional Cardiology', 'Musculoskeletal Orthopedics', 'Reproductive IVF Center', 'Clinical Dermatology'],
    centresOfExcellence: ['American Heart Program', 'Advanced Fertility & IVF Center'],
    treatmentsOffered: ['Transcatheter Aortic Valve Replacement (TAVR)', 'In-Vitro Fertilization Cycles', 'Laser Skin Graft Reconstructions'],
    blogDescription: `American Hospital Dubai represents the gold standard of luxury, patient-centric healthcare within the Middle East region. Built closely around premium medical standards, its clinical methodology ensures a highly accurate diagnosis and state-of-the-art restorative pathing. 

    Beyond clinical excellence, the structure features five-star recovery standardizations, private medical flats, and highly curated nutritional cuisines overseen directly by specialty dietitians. The surgical departments utilize advanced technology including robotic platforms and automated clinical support tracking.

    The primary mission focuses on treating global citizens seamlessly through integrated international support structures. This ensures direct communication lines with domestic care providers back in patients' home countries for unbroken continuity of care.`
  },
  {
    id: 5,
    slug: 'aga-khan-karachi',
    name: 'Aga Khan University Hospital Karachi',
    country: 'Pakistan',
    image: 'https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=800&h=400&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1627225924839-c0a59ecd272d?w=100&h=100&fit=crop',
    city: 'Karachi',
    address: 'National Stadium Rd, Block 1 Karachi Vista, Karachi, Pakistan',
    websiteUrl: 'https://hospitals.aku.edu/pakistan',
    rating: 4.7,
    reviews: 198,
    description: 'Premier teaching hospital with cutting-edge medical technology.',
    beds: 450,
    established: 1985,
    specializations: ['Cardiac Surgery', 'Orthopedics', 'Oncology', 'Nephrology'],
    accreditations: ['JCI'],
    avgCost: { min: 7000, max: 40000 },
    // New requested fields
    icuAvailability: true,
    intlServices: ['Saarc Region Travel Help', 'Low-Cost Charity Subsidy Portals', 'Family Accommodation Hostels'],
    departments: ['Cardiothoracic Surgery', 'Orthopedic Trauma Center', 'Oncology Care Research Wing', 'Nephrology Dialysis Support'],
    centresOfExcellence: ['AKU Heart and Lung Center', 'Oncology Clinical Trials Department'],
    treatmentsOffered: ['Open Heart Valve Reconstruction', 'Complex Nonunion Fracture Reconstruction', 'Hemodialysis Sessions'],
    blogDescription: `Aga Khan University Hospital Karachi stands out as a flagship research and teaching hospital, known for delivering high-quality clinical outcomes across South Asia. Adhering strictly to JCI benchmarks, it provides complex interventions backed by a strong academic team.

    The hospital includes specialized clinical evaluation wings, tumor board modules for cancer targeting, and dedicated orthopedic trauma programs. The care pathways are systematically designed using proof-driven methodologies to optimize medical results.

    With decades of experience managing regional patients, the campus provides comprehensive services including on-site multi-denominational chapels, guest facilities, and direct visa documentation workflows, making high-end clinical treatment accessible and reliable.`
  }
];

export const doctors = [
  {
    id: 1,
    slug: 'dr-rajesh-sharma',
    name: 'Dr. Rajesh Sharma',
    specialization: 'Cardiac Surgery',
    hospital: 'Apollo Hospital Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1612349317150-e0a1a03b0c70?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 156,
    experience: 20,
    qualification: 'MD, MCh (Cardiothoracic Surgery)',
    languages: ['English', 'Hindi'],
    consultationFee: 1500, // Consultation Fee (INR)
    description: 'Renowned cardiac surgeon with expertise in complex heart surgeries.',
    // New requested fields
    subSpecialty: 'Adult Cardiothoracic Surgery & Heart Transplants',
    department: 'Cardiology & Cardiothoracic Services',
    city: 'New Delhi',
    expertiseAreas: ['Coronary Artery Bypass Grafting (CABG)', 'Valvular Heart Repair', 'Minimally Invasive Cardiac Surgery', 'Aortic Aneurysm Repair'],
    majorProcedures: ['Beating Heart Bypass surgery', 'Mitral Valve Replacement', 'TAVR Procedures', 'LVAD Transplants'],
    awards: ['Best Cardiologist Award 2022', 'National Medical Excellence Award 2024'],
    memberships: ['Fellow of Indian Association of Cardiovascular Thoracic Surgeons (IACTS)', 'Member of Cardiological Society of India (CSI)'],
    intlExperience: ['Senior Fellow at Mayo Clinic, USA (2012-2014)', 'Visiting Consultant at Royal Brompton Hospital, UK'],
    recommendedTreatments: ['heart-bypass-surgery'],
    longBio: `Dr. Rajesh Sharma is a pioneer in the field of advanced cardiothoracic interventions across Southeast Asia. With a distinguished career spanning over two decades, he has successfully completed more than 5,000 complex cardiothoracic and vascular surgeries, earning global validation for his contributions to minimally invasive beating-heart surgery protocols. 

    After completing his advanced postgraduate surgical qualifications in elite institutions across India, Dr. Sharma pursued hyper-specialized sub-specialty fellowships in premier international cardiac programs. His tenure at the Mayo Clinic allowed him to closely master robotic-assisted coronary revascularizations and terminal heart failure mechanical circulatory support configurations. He remains committed to integrating empirical evidence-based treatment guidelines into day-to-day therapeutic interventions.

    At Apollo Hospital Delhi, Dr. Sharma directs a high-acuity multi-disciplinary operative team managing structural cardiac mutations and severe multi-vessel vascular blockages. Beyond his technical acumen in the operating theatre, his care philosophy remains highly patient-centric, ensuring international traveling patients receive transparent medical roadmaps from baseline diagnosis to absolute physical rehabilitation. He actively contributes to ongoing global clinical trials regarding artificial valve longevity materials.`
  },
  {
    id: 2,
    slug: 'dr-priya-gupta',
    name: 'Dr. Priya Gupta',
    specialization: 'Orthopedic Surgery',
    hospital: 'Max Healthcare Bangalore',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1638599810033-ba39fd5faf60?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 143,
    experience: 18,
    qualification: 'MS (Orthopedics), DNB, Fellowship in Joint Arthroplasty',
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFee: 1200, // Consultation Fee (INR)
    description: 'Expert in joint replacement and arthroscopic surgeries.',
    // New requested fields
    subSpecialty: 'Robotic Total Joint Arthroplasty & Sports Medicine',
    department: 'Institute of Musculoskeletal Sciences',
    city: 'Bangalore',
    expertiseAreas: ['Primary Knee & Hip Replacement', 'Revision Joint Reconstruction', 'ACL/PCL Knee Ligament Reconstruction', 'Complex Trauma Orthopedics'],
    majorProcedures: ['Robotic Total Knee Replacement', 'Arthroscopic Shoulder Stabilization', 'Hip Resurfacing'],
    awards: ['Orthopedist of the Year - Karnataka Medical Council (2023)', 'Distinguished Researcher Award 2021'],
    memberships: ['Indian Orthopedic Association (IOA)', 'International Society for Knowledge for Surgeons on Arthroscopy and Arthroplasty (ISKSAA)'],
    intlExperience: ['Joint Reconstruction Fellowship, Munich, Germany', 'Sports Medicine Observer, Sydney, Australia'],
    recommendedTreatments: ['knee-replacement'],
    longBio: `Dr. Priya Gupta is a highly acclaimed specialist in robotic joint replacement and computer-navigated reconstruction techniques. Over her 18-year career, she has garnered a stellar reputation for delivering phenomenal patient outcomes, combining mechanical precision with a dedicated, customized physical rehabilitation track for sports professionals and elderly patients alike.

    She completed her extensive foundational training in orthopedic surgery within highly rigorous institutional frameworks before transitioning into advanced computer-assisted surgical navigation domains across Europe. Her pioneering research in modular articular implant positioning has altered recovery trajectories, effectively reducing post-operative recovery timelines down to weeks instead of months.

    Currently practicing at Max Healthcare Bangalore, Dr. Gupta manages a high volume of local and international surgical candidates presenting with advanced osteoarthritic degradation and athletic ligament disruptions. She is a strong advocate for bone-preserving surgical approaches and frequently organizes medical educational seminars across regional medical colleges to pass on modern robotic alignment techniques to the next generation of surgeons.`
  },
  {
    id: 3,
    slug: 'dr-ahmed-hassan',
    name: 'Dr. Ahmed Hassan',
    specialization: 'Neurosurgery',
    hospital: 'American Hospital Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1611613535308-eb5fbd8b86b3?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 187,
    experience: 22,
    qualification: 'MD, Ph.D. in Neurological Surgery, European Board of Neurosurgery',
    languages: ['English', 'Arabic'],
    consultationFee: 5000, // Consultation Fee (Converted/INR standard)
    description: 'Leading neurosurgeon specializing in complex brain and spine surgeries.',
    // New requested fields
    subSpecialty: 'Functional Neurosurgery & Neuro-Oncology',
    department: 'Department of Neurosciences',
    city: 'Dubai',
    expertiseAreas: ['Stereotactic Brain Tumor Excision', 'Minimally Invasive Spine Surgery (MISS)', 'Deep Brain Stimulation (DBS)', 'Cerebrovascular Aneurysm Clipping'],
    majorProcedures: ['Awake Craniotomy', 'Microdiscectomy', 'Endoscopic Skull Base Excision'],
    awards: ['Middle East Medical Excellence Laurel 2023', 'Exemplary Surgeon Citation by Dubai Health Authority'],
    memberships: ['Congress of Neurological Surgeons (USA)', 'European Association of Neurosurgical Societies (EANS)'],
    intlExperience: ['Consultant Neurosurgeon, Paris University Hospital, France', 'Research Scholar, Johns Hopkins Medicine, USA'],
    recommendedTreatments: ['brain-surgery'],
    longBio: `Dr. Ahmed Hassan stands at the absolute vanguard of neurosurgical innovations in the Middle East. Over his 22-year tenure, he has accumulated vast clinical expertise in handling high-risk neuro-oncological lesions and multi-level spinal disc disorders, consistently recognized for utilizing micro-endoscopic and stereotactic frameworks that maximize patient safety boundaries.

    Dr. Hassan’s academic pathway includes an intensive clinical PhD track followed by formal board certifications across Europe. He spent multiple years working within leading French neurosurgical theaters, mastering awake craniotomies for deep-seated intraaxial tumors located directly inside critical eloquent language zones of the cerebral cortex.

    Operating at American Hospital Dubai, he utilizes state-of-the-art intraoperative MRI navigation blocks and high-definition sensory monitoring setups to achieve optimal tumor resections. He remains highly preferred by international patients due to his clear, concise diagnostic counseling and strict integration of precise post-operative neuro-rehabilitative steps.`
  },
  {
    id: 4,
    slug: 'dr-aisha-khan',
    name: 'Dr. Aisha Khan',
    specialization: 'Oncology',
    hospital: 'Fortis Hospital Hyderabad',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1622803268553-b1b0f85f7e9f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 127,
    experience: 16,
    qualification: 'MD (Internal Medicine), DM (Medical Oncology)',
    languages: ['English', 'Hindi', 'Urdu'],
    consultationFee: 1500, // Consultation Fee (INR)
    description: 'Compassionate oncologist with success in cancer treatment protocols.',
    // New requested fields
    subSpecialty: 'Solid Tumor Therapeutics & Targeted Immunotherapy',
    department: 'Cancer Care Centre of Excellence',
    city: 'Hyderabad',
    expertiseAreas: ['Breast Cancer Chemotherapy Management', 'Lung & Gastrointestinal Malignancies', 'Precision Targeted Monoclonal Antibody Therapy', 'Autologous Bone Marrow Overviews'],
    majorProcedures: ['Precision Chemotherapy infusion mapping', 'Intrathecal Treatment Deliveries', 'Immunotherapy Regimen Structuring'],
    awards: ['National Women In Medicine Laurel 2023', 'Outstanding Clinical Oncology Achievement Award'],
    memberships: ['American Society of Clinical Oncology (ASCO)', 'European Society for Medical Oncology (ESMO)'],
    intlExperience: ['Clinical Research Associate at National Cancer Centre, Singapore', 'Oncology Care Observer, King’s College London, UK'],
    recommendedTreatments: ['cancer-treatment'],
    longBio: `Dr. Aisha Khan is an exceptionally meticulous and compassionate Medical Oncologist based out of Hyderabad. Known for her expertise in genomic sequencing and targeted biological therapies, she works tirelessly to develop hyper-personalized oncology protocols that aggressively counter malignant mutations while minimizing systematic cellular toxicity.

    After completing her specialized doctorate in Medical Oncology, Dr. Khan engaged in multi-center clinical data tracking across Singapore, analyzing biomarker trends across distinct regional demographics. She believes that the future of cancer care lies directly in genomic typing, tailoring specific therapy pathways to individual genetic markers.

    At Fortis Hospital Hyderabad, she chairs a comprehensive Tumor Board module where surgeons, radiologists, and pathologists collaborate systematically to craft safe, coordinated long-term survivorship programs. She is highly valued by global patient families for her clear communication, empathetic approach, and dedication to supportive palliative care integration.`
  },
  {
    id: 5,
    slug: 'dr-ali-raza',
    name: 'Dr. Ali Raza',
    specialization: 'Orthopedic Surgery',
    hospital: 'Aga Khan University Hospital Karachi',
    country: 'Pakistan',
    image: 'https://images.unsplash.com/photo-1627225924839-c0a59ecd272d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 134,
    experience: 19,
    qualification: 'MS (Orthopedics), FRCS (Orthopedics, UK)',
    languages: ['English', 'Urdu'],
    consultationFee: 2000, // Consultation Fee (PKR to INR equivalence conversion)
    description: 'Specialist in sports medicine and orthopedic trauma.',
    // New requested fields
    subSpecialty: 'Arthroscopic Reconstructions & Complex Musculoskeletal Trauma',
    department: 'Orthopedic Trauma Center',
    city: 'Karachi',
    expertiseAreas: ['Sports Injury Management & Arthroscopy', 'Complex Nonunion Fracture Reconstruction', 'Shoulder & Rotator Cuff Repairs', 'Deformity Correction'],
    majorProcedures: ['Multi-ligament Arthroscopic Knee Reconstruction', 'Total Shoulder Arthroplasty', 'Ilizarov External Fixation Treatments'],
    awards: ['Aga Khan Faculty Excellence Award 2021', 'Surgical Innovation Medal 2024'],
    memberships: ['Royal College of Surgeons of Edinburgh', 'Pakistan Orthopaedic Association (POA)'],
    intlExperience: ['Trauma Fellowship, Leeds General Infirmary, UK', 'Arthroscopy Training Module, Osaka, Japan'],
    recommendedTreatments: ['knee-replacement'],
    longBio: `Dr. Ali Raza is a highly decorated Fellow of the Royal College of Surgeons, currently leading structural bone trauma and athletic limb modifications within South Asia. His 19-year portfolio features a massive volume of intricate articular interventions, multi-fragment fracture realignments, and advanced dynamic joint balancing operations.

    Dr. Raza completed extensive postgraduate clinical residencies in the United Kingdom, focusing entirely on structural trauma tracks and high-velocity bone reconstructions. This foundation equipped him with complex fixator methodologies and advanced arthroscopic diagnostic insights that yield optimal skeletal recovery.

    Based at Aga Khan University Hospital Karachi, his practice attracts complex reference cases from across regional borders. Dr. Raza remains fully active in analyzing biomechanical durability models for modern structural implants, integrating comprehensive early-mobilization exercises into post-operative plans to safely restore full long-term functional mobility.`
  }
];

export const treatments = [
  {
    id: 1,
    slug: 'heart-bypass-surgery',
    name: 'Heart Bypass Surgery',
    category: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1576091160500-112173e7f9db?w=800&h=400&fit=crop',
    description: 'Coronary artery bypass grafting for heart disease treatment.',
    avgCost: { min: 15000, max: 35000 },
    duration: '5-7 days',
    successRate: 95,
    recovery: '4-6 weeks',
    hospitals: ['Apollo Hospital Delhi', 'Max Healthcare Bangalore'],
    doctors: ['Dr. Rajesh Sharma'],
  },
  {
    id: 2,
    slug: 'knee-replacement',
    name: 'Knee Replacement Surgery',
    category: 'Orthopedics',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=400&fit=crop',
    description: 'Total knee replacement for osteoarthritis and joint degeneration.',
    avgCost: { min: 12000, max: 25000 },
    duration: '2-3 days',
    successRate: 98,
    recovery: '3-6 months',
    hospitals: ['Max Healthcare Bangalore', 'Fortis Hospital Hyderabad'],
    doctors: ['Dr. Priya Gupta', 'Dr. Ali Raza'],
  },
  {
    id: 3,
    slug: 'cancer-treatment',
    name: 'Advanced Cancer Treatment',
    category: 'Oncology',
    image: 'https://images.unsplash.com/photo-1576091160949-112173e7f9db?w=800&h=400&fit=crop',
    description: 'Comprehensive cancer care including chemotherapy, radiation, and immunotherapy.',
    avgCost: { min: 20000, max: 60000 },
    duration: '3-6 months',
    successRate: 85,
    recovery: 'Varies',
    hospitals: ['Apollo Hospital Delhi', 'Fortis Hospital Hyderabad'],
    doctors: ['Dr. Aisha Khan'],
  },
  {
    id: 4,
    slug: 'brain-surgery',
    name: 'Brain Tumor Surgery',
    category: 'Neurosurgery',
    image: 'https://images.unsplash.com/photo-1576091160395-112173e7f9db?w=800&h=400&fit=crop',
    description: 'Minimally invasive brain tumor removal using advanced imaging.',
    avgCost: { min: 25000, max: 50000 },
    duration: '3-5 days',
    successRate: 92,
    recovery: '6-8 weeks',
    hospitals: ['Apollo Hospital Delhi', 'American Hospital Dubai'],
    doctors: ['Dr. Ahmed Hassan'],
  },
  {
    id: 5,
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Dentistry',
    image: 'https://images.unsplash.com/photo-1606811841689-23db3d821bda?w=800&h=400&fit=crop',
    description: 'Tooth replacement with advanced titanium implants.',
    avgCost: { min: 800, max: 2500 },
    duration: '1-2 days',
    successRate: 98,
    recovery: '3-6 months',
    hospitals: ['Apollo Hospital Delhi', 'Max Healthcare Bangalore'],
    doctors: [],
  },
];

export const countries = [
  {
    id: 1,
    slug: 'india',
    name: 'India',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
    description: 'Premier medical tourism destination offering world-class healthcare at affordable prices.',
    hospitals: 3,
    avgCost: 'Starting from $5,000',
    visaDays: 60,
    specialities: ['Cardiology', 'Orthopedics', 'Oncology', 'Dentistry'],
    highlights: ['30-80% cost savings', 'Advanced technology', 'English-speaking doctors'],
  },
  {
    id: 2,
    slug: 'uae',
    name: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453315462-35149a37426f?w=800&h=400&fit=crop',
    description: 'Luxury medical facilities with premium healthcare services.',
    hospitals: 1,
    avgCost: 'Starting from $15,000',
    visaDays: 30,
    specialities: ['Cardiology', 'IVF', 'Dermatology', 'Orthopedics'],
    highlights: ['Premium facilities', 'Modern infrastructure', 'Tourism opportunities'],
  },
  {
    id: 3,
    slug: 'pakistan',
    name: 'Pakistan',
    image: 'https://images.unsplash.com/photo-1593272715884-b88fdfb4b38f?w=800&h=400&fit=crop',
    description: 'Growing medical hub with quality healthcare and cultural connectivity.',
    hospitals: 1,
    avgCost: 'Starting from $4,000',
    visaDays: 90,
    specialities: ['Orthopedics', 'Cardiac Surgery', 'General Surgery'],
    highlights: ['Cultural affinity', 'Affordable costs', 'Experienced surgeons'],
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'USA',
    treatment: 'Knee Replacement',
    hospital: 'Max Healthcare Bangalore',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Amazing experience! The staff was incredibly professional and caring. I saved 80% on my surgery costs.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'Canada',
    treatment: 'Heart Bypass Surgery',
    hospital: 'Apollo Hospital Delhi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'Exceptional care from top surgeons. The entire experience was seamless from consultation to recovery.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maria Garcia',
    location: 'Spain',
    treatment: 'Dental Implants',
    hospital: 'Apollo Hospital Delhi',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'Best decision I made. Professional doctors, modern facilities, and unbeatable prices!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ahmed Mohamed',
    location: 'Saudi Arabia',
    treatment: 'Brain Surgery',
    hospital: 'American Hospital Dubai',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    text: 'Top-notch medical expertise combined with warm hospitality. Highly recommended!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Chen',
    location: 'Australia',
    treatment: 'Orthopedic Surgery',
    hospital: 'Fortis Hospital Hyderabad',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'The care I received was world-class. I\'m back to normal life in just 4 months!',
    rating: 5,
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: 'cost-savings-medical-tourism',
    title: 'How Medical Tourism Can Save You Up to 80% on Healthcare Costs',
    author: 'Dr. Priya Sharma',
    date: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1576091160500-112173e7f9db?w=400&h=200&fit=crop',
    excerpt: 'Explore the financial benefits of choosing medical tourism for your healthcare needs.',
    category: 'Cost Savings',
  },
  {
    id: 2,
    slug: 'preparing-for-surgery',
    title: 'Complete Guide to Preparing for Your Medical Tourism Surgery',
    author: 'Dr. Rajesh Kumar',
    date: '2024-04-10',
    image: 'https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=400&h=200&fit=crop',
    excerpt: 'Essential tips and checklist for preparing yourself before your surgery abroad.',
    category: 'Patient Guide',
  },
  {
    id: 3,
    slug: 'recovery-tips',
    title: 'Post-Surgery Recovery: Tips for a Smooth Healing Process',
    author: 'Dr. Aisha Khan',
    date: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1576091160395-112173e7f9db?w=400&h=200&fit=crop',
    excerpt: 'Follow these expert recommendations for optimal recovery after your surgery.',
    category: 'Recovery',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Is medical tourism safe?',
    answer: 'Yes, our partner hospitals are internationally accredited (JCI, NABH) and employ experienced surgeons trained globally.',
  },
  {
    id: 2,
    question: 'What about visa requirements?',
    answer: 'Most countries offer medical visas with extended validity. Our team assists with all visa-related documentation.',
  },
  {
    id: 3,
    question: 'Do you provide travel arrangements?',
    answer: 'Yes, we arrange flights, accommodation, and airport transfers as part of our comprehensive packages.',
  },
  {
    id: 4,
    question: 'What is the cost difference?',
    answer: 'On average, you can save 50-80% compared to Western countries while receiving care from world-class surgeons.',
  },
  {
    id: 5,
    question: 'How long is the recovery period?',
    answer: 'Recovery varies by procedure. Most patients return to normal activities within 2-12 weeks.',
  },
  {
    id: 6,
    question: 'Will there be follow-up care?',
    answer: 'Yes, we provide online follow-ups and coordinate with your local doctor for post-operative care.',
  },
];
