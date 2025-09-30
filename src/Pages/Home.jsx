import React from "react";
import Banner from "../components/Banner";
import useTitle from "../hooks/UseTitle";
import TagsSection from "../components/TagsSection";
import AnnouncementsSection from "../components/AnnouncementsSection";
import Posts from "../components/Posts";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <TagsSection></TagsSection>
      <AnnouncementsSection></AnnouncementsSection>
      <Posts></Posts>
    </div>
  );
};

export default Home;
