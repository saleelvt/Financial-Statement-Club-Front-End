/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DocumentSliceEn,
  DocumentSliceAr,
  FormDataState,
} from "../../../interfaces/admin/addDoument";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import "../../../css/YearSlider.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";

 const UserCompanyDetails = React.memo(() => {
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [document, setDocument] = useState<DocumentSliceEn | DocumentSliceAr>();
  const tadawalCode = queryParams.get("tadawalCode") || "";
  const language = queryParams.get("language") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearList, setYearList] = useState<string[]>([]);
  const [selectedPdfKey, setSelectedPdfKey] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedFilteredDocWithYear, setSelectedFilteredDocWithYear] =
    useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [visibleYears, setVisibleYears] = useState<number>(0);
  const [iframeSrc, setIframeSrc] = useState<string>("");

  const pdfKeys: (keyof FormDataState)[] = [
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "S1",
    "Year",
    "Board",
  ];

  const handleYearClick = async(year: string) => {
    setSelectedYear(year);
    setSelectedFilteredDocWithYear([]); // Clear previously filtered documents
    setSelectedPdfKey(null); // Reset the selected PDF key
    setIframeSrc(""); // Reset the iframe source
    const filteredYears = documents.filter((doc) => doc.formData?.Q1?.year === year) .filter(Boolean);
    await  setSelectedFilteredDocWithYear(filteredYears);
  };

  const handlePdfButtonClick = (key: string) => {
    setSelectedPdfKey(key);
    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0];
      const fileUrl =
        document.formData[key as keyof typeof document.formData]?.file;
      if (fileUrl) {
        if (typeof fileUrl === "string") {
          const encodedUrl = encodeURIComponent(fileUrl);
          const googleViewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true&toolbar=0&navigator=0&scrollbar=0`;
          setIframeSrc(`${googleViewerUrl}#toolbar=0`);
          setLoading(false);
        } else {
          console.error("fileUrl is not a valid string:", fileUrl);
        }
        // setSelectedPdfUrl(fileUrl);
      } else {
        setLoading(false);
        alert(`No PDF available for ${key}`);
      }
    }
  };

  const handleLeftClick = () => {
    if (visibleYears > 0) {
      setVisibleYears(visibleYears - 1);
    }
  };

  const handleRightClick = () => {
    if (visibleYears < yearList.length - 1) {
      setVisibleYears(visibleYears + 1);
    }
  };

  const isDocumentEn = (  document: DocumentSliceEn | DocumentSliceAr): document is DocumentSliceEn => {
    return (document as DocumentSliceEn).fullNameEn !== undefined;
  };
  useEffect(() => {
    const TakeYears = () => {
      const years: string[] = documents
        .map((doc) => doc.formData?.Q1?.year) .filter((year): year is string => year !== undefined)
        .sort((a, b) => parseInt(a) - parseInt(b)); setYearList(years)};
    TakeYears();
  }, [documents]);

  useEffect(() => {
    if (documents.length > 0) {
      setDocument(documents[0]);
    }
  }, [documents]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ language,tadawalCode }).toString();

        const response = await commonRequest(
          "GET",
          `/api/v1/admin/getDocumetnBytadawalCode?${params}`,
          config
        );

        if (response.status === 200 && response.data?.data) {
          await setDocuments(response.data.data);
        } else {
          setError("Failed to fetch documents");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [language]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }


  return (
    <div
      dir={userLanguage === "English" ? "ltr" : "rtl"} 
      className="min-h-96 text-2xl font-semibold    flex flex-col lg:flex-row"
    >
      <div className="w-full  lg:w-[60%]">
        <div dir={userLanguage === "English" ? "ltr" : "rtl"} className="rounded-md   xs:p-1 lg:p-2 mb-4 ">
          {document && (
            <div >
              <div className="flex lg;flex-col flex-row lg:justify-start sm:justify-center  md:justify-center xs:justify-center   sm:flex-row w-full items-start">
                <div className="flex   mt-3  mr-4  ">
                  {userLanguage === "Arabic" ? (
                    <FaArrowCircleRight
                      className="text-3xl  ml-4  xs:hidden sm:hidden md:hidden lg:block text-gray-600"
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                  ) : (
                    <FaArrowCircleLeft
                      className="text-3xl xs:hidden sm:hidden md:hidden lg:block text-gray-600"
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                  )}
                </div>

                <div className="  flex  flex-col justify-center    ">
                   <div className="flex  text-[14px] font-serif     justify-center lg:justify-start ">
                   <h3 className="text-gray-800  text-center ">
                      {
                        (isDocumentEn(document)
                          ? document.nickNameEn
                          : document.nickNameAr) 
                        }
                    </h3>
                   </div>
                  <div className="flex flex-col md:flex-row  text-[14px] font-serif    justify-center lg:justify-start ">
                    
                    <h3 className="text-gray-800 text-center ">
                      {isDocumentEn(document)
                        ? document.fullNameEn
                        : document.fullNameAr}
                    </h3>
                    
                  </div>
                  <div className="flex    justify-center lg:justify-start items-center ">
                    <h3 className=" text-[14px] font-serif  text-gray-800">
                      {isDocumentEn(document)
                        ? document.sector
                        : document.sector}
                    </h3>
                  </div>









                  <div dir={userLanguage === "English" ? "ltr" : "rtl"} className="flex justify-start gap-[6px]  text-xs justify-center lg:justify-start ">
               <div className="flex  items-center   ">
          <button onClick={handleRightClick} className="text-gray-600 flex  items-center   justify-center text-[16px] px-2 py-1   bg-gray-200 rounded-md     "> {"<"}</button>
          </div>


            {/* <div className="flex items-center">
         <FaArrowCircleLeft  onClick={handleRightClick} className="text-gray-600 items-center text-xl  "/>
         </div> */}

          <div className="flex flex-wrap gap-4 py-1 items-center justify-center lg:justify-start ">


            {yearList.slice(visibleYears, visibleYears + 5).map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`px-2  py-1 rounded-md ${
                  selectedYear === year
                    ? "bg-gray-600 text-white"
                    : "bg-gray-200 text-gray-700 "
                }`}
              >
                {year}
              </button>
            ))}
          </div>



 <div className="flex items-center ">
<button  onClick={handleLeftClick} className="text-gray-600 flex  items-center justify-center text-[16px] px-2 py-1   bg-gray-200 rounded-md   "> {">"}</button>
</div>
        
            {/* <FaArrowCircleRight className="text-lg text-gray-600" /> */}
           {/* <div className="flex items-center">
           < FaArrowCircleRight  onClick={handleLeftClick} className="text-gray-600   items-center text-xl " />
           </div> */}
         
        </div>

        
    <div dir={userLanguage === "English" ? "ltr" : "rtl"}   className="mt-2  flex justify-center lg:justify-start rounded-lg text-xs"
        >
          {selectedFilteredDocWithYear.length > 0 ? (
            <div className="flex flex-wrap gap-3">

              {pdfKeys.map((key) => {
                const isFileAvailable = selectedFilteredDocWithYear.some(
                  (doc) => doc.formData[key].file !== null
                );


                return (
                  isFileAvailable && (
                    <button
                      key={key}
                      onClick={() => handlePdfButtonClick(key)}
                      className={`px-2 py-1 text-xs bg-gray-200 rounded-md ${
                        selectedPdfKey === key
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {key}
                    </button>
                  )
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600"></p>
          )}
          
        </div>
                </div>
              </div>
            </div>
          )}
        </div>

        

  

      </div>

      <div className="lg:w-[75%]   mt-2  ">
        {iframeSrc ? (
          <div
            className="rounded-md "
            style={{
              position: "relative",
              width: "100%",
              height: "100vh", // Adjust height for mobile responsiveness
            }}
          >
            <iframe
              src={iframeSrc}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="PDF Viewer"
              frameBorder="0"
            />
          </div>
        ) : (
          <div className="w-full  flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-white rounded-lg"></div>
        )}
      </div>
    </div>
  );
});

export default UserCompanyDetails;