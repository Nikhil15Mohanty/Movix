import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    // Accessing the 'url' from the Redux store using the 'useSelector' hook
    const { url } = useSelector((state) => state.home);

    // Function to render a skeleton UI for loading state
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    // If the data is available, render the cast list
                    <div className="listItems">
                        {data?.map((item) => {
                            // Checking if the cast member has a profile picture or not
                            // If available, use the profile picture URL from the Redux store, otherwise use the default avatar
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    {/* Display the profile picture using the 'Img' component */}
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    {/* Display the name of the cast member */}
                                    <div className="name">{item.name}</div>
                                    {/* Display the character name played by the cast member */}
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // If data is loading, render the skeleton UI to indicate the loading state
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
