/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect,lazy } from "react";
import "../../../global.css";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
const Loading = lazy(() => import("../Loading"));
import { setArabicNames } from "../../../functions/setArabicNames";
import { setEnglishNames } from "../../../functions/setEnglishNames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { userLanguageChange } from "../../../reduxKit/actions/auth/authAction";
import { GrLanguage } from "react-icons/gr";
import "../../../css/userHome.css";
import { Error } from "../Error";






import {
  DocumentSliceAr,
  DocumentSliceEn,
} from "../../../interfaces/admin/addDoument";
import { useNavigate } from "react-router-dom";

const UserHomePage: React.FC = React.memo(() => {
  // const [showAll, setShowAll] = useState(false);
  const [brandsEn, setBrandsEn] = useState< {
      fullNameEn: string;
      nickNameEn: string;
      tadawalCode: string;
      sector: string;
      id: string;
    }[]
  >([]);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<
    (DocumentSliceAr | DocumentSliceEn)[]
  >([]);
  const [brandsAr, setBrandsAr] = useState<
    {
      fullNameEn: string;
      nickNameEn: string;
      tadawalCode: string;
      sector: string;
      id: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<string>("Arabic");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { userLanguage } = useSelector( (state: RootState) => state.userLanguage);
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        if (userLanguage) setLanguage(userLanguage);
        const endpoint =
          userLanguage === "English"
            ? "/api/v1/admin/getDocuments"
            : "/api/v1/admin/getArabicDocuments";
        const response = await commonRequest("GET", endpoint, config, null);

        if (response.status === 200 && response.data?.data) {
          setDocuments(response.data.data);
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
  }, [userLanguage]);

  useEffect(() => {
    if (documents.length > 0) {
      const { arabicNamesArray } = setArabicNames(documents);
      setBrandsAr(arabicNamesArray);
      const { englishNamesArray } = setEnglishNames(documents);
      setBrandsEn(englishNamesArray);
    }
  }, [documents]);

  const handleBrandClick = async (tadawalCode: string) => {
    setSelectedBrand(tadawalCode);
    navigate(`/companyDetails?tadawalCode=${tadawalCode}&language=${language}`);
  };

  const toggleLanguage = async () => {
    const newLanguage = language === "English" ? "Arabic" : "English";
    setLanguage(newLanguage);
    await dispatch(userLanguageChange(newLanguage));
  };

  const arrays = userLanguage === "English" ? brandsEn : brandsAr;
  const currentBrands = arrays.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t?.nickNameEn === item?.nickNameEn)
  ) .sort((a, b) =>
    userLanguage === "English"
      ? a.nickNameEn.localeCompare(b.nickNameEn, "en", { sensitivity: "base" })
      : a.nickNameEn.localeCompare(b.nickNameEn, "ar", { sensitivity: "base" })
  );
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div
      style={{ backgroundColor: "#666666" }}
      className=" text-white min-h-screen flex flex-col items-center xs:p-2 lg:px-24 lg:p-4"
    >
      <div className="flex   justify-end w-3/4">
        <button
          onClick={toggleLanguage} 
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(128, 128, 128, 0.8))",
          }}
          className="py-1  px-2 items-center bg-opacity-80 text-black text-xl  rounded-md "
        >
         <GrLanguage />
        </button>
      </div>
      <div
      dir={ language === "Arabic" ? "rtl" : "ltr"}
        className={`nickName grid xs:grid-cols-6  mx-[14px]    lg:grid-cols-10  lg:text-[15px]  md:text-[15px]  sm:text-[15px]  xs:text-[13px]  xs:gap-6 lg:gap-[14px] md:lg:gap-[15px]  sm:gap-[15px]         rounded-lg   sm:grid-cols-6 mt-2  md:grid-cols-8  ${
          language === "Arabic" ? "text-right" : ""    
        }`} 
      >
        {currentBrands
          .map((brand, index) => (
            <button
              key={index}
              onClick={() => handleBrandClick(brand.tadawalCode)}
              className={` font-serif  text-left  flex  justify-start  items-center   ${
                selectedBrand === brand.tadawalCode
                  ? "bg-gray-200  text-black"
                  : ""
              } ${language === "Arabic" ? "py-[4px] px-[0px] " : ""}`}
            >
              {brand.nickNameEn}
            </button>
          ))}
      </div>

      <div className="mt-6" >
       
      </div>
      <div className="relative w-full flex flex-col items-center p-8 bg-opacity-50 text-center">
      </div>
    </div>
  );

})

export default UserHomePage;
