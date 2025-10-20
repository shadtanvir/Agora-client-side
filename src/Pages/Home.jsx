import React from "react";
import Banner from "../components/Banner";
import useTitle from "../hooks/UseTitle";
import TagsSection from "../components/TagsSection";
import AnnouncementsSection from "../components/AnnouncementsSection";
import Posts from "../components/Posts";
import Testimonials from "../components/Testimonials";
import FeaturedMembers from "../components/FeaturedMembers";
import CommunityImpact from "../components/CommunityImpact";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <TagsSection></TagsSection>
      <AnnouncementsSection></AnnouncementsSection>
      <Posts></Posts>
      <FeaturedMembers></FeaturedMembers>
      <CommunityImpact></CommunityImpact>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
