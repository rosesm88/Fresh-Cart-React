import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <DisplayProducts />
    </>
  );
}
