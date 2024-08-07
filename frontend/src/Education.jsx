// Education.jsx

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import { Card, CardContent, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import ArticleDetail from "./Article"; // Import ArticleDetail component
import "./Education.css";

const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const response = await fetch("https://bank-sampah-bersinar2-b3ffehbphqdqgshh.southeastasia-01.azurewebsites.net/api/user/education");
                if (!response.ok) {
                    throw new Error("Failed to fetch education data");
                }
                const data = await response.json();
                setEducationData(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchEducationData();
    }, []);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const handleBack = () => {
        setSelectedArticle(null);
    };

    return (
        <>
            <Navbar />
            <header className="bg-white shadow" style={{backgroundColor:"#2C7865"}}>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{color:"white"}}>Education</h1>
                </div>
            </header>
            <div className="edu-content">
                {selectedArticle ? (
                    <div className="article-detail-container">
                        <ArticleDetail article={selectedArticle} />
                        <Button onClick={handleBack} className="button">Back</Button>
                    </div>
                ) : (
                    educationData.slice().reverse().map((item, index) => (
                        <Card key={index} className="edu-card">
                            <CardContent className="edu-content-card">
                                <img src={`${item.picture}`} alt={item.title} />
                                <CardTitle>{item.title}</CardTitle>
                                <p>{item.article}</p>
                                <Button onClick={() => handleReadMore(item)} className="button">Read More</Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
};

export default Education;
