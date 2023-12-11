// @react-client
"use client";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";

const HorizontalTabs = () => {
    const [selected, setSelected] = React.useState("photos");
    const handleSelectionChange = (key: string) => {
        setSelected(key);
    };

    return (
        <div className="w-full mx-auto p-8">
            <Tabs
                aria-label="Options"
                selectedKey={selected}
                onChange={()=>handleSelectionChange('Options')}
                className="bg-orange-300 rounded-lg p-2 w-full "
                color="primary"
            >
                <Tab key="Tab1" title="Subject" className="w-96">
                    <Card>
                        <CardBody className="p-4">
                            a subject typically refers to a specific area of
                            knowledge or a branch of study that is taught in
                            schools or educational institutions. Each subject is
                            designed to cover a specific set of topics and
                            skills, providing students with a well-rounded
                            education. Students typically take a variety of
                            subjects throughout their academic years to gain
                            knowledge in different fields and develop a range of
                            skills. The subjects offered can vary depending on
                            the educational level .
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="Syllabus">
                    <Card>
                        <CardBody className="p-4">
                            <p className="text-gray-700">
                                A syllabus is a document that outlines the
                                structure and content of a course of study. It
                                serves as a guide for both students and
                                instructors, providing an overview of the topics
                                to be covered, the schedule of classes, the
                                required readings and materials, assignments,
                                assessments, and any other relevant information.
                                The syllabus is essentially a roadmap for the
                                course, helping students understand what is
                                expected of them and what they can expect from
                                the course.
                            </p>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Assessment">
                    <Card>
                        <CardBody className="p-4">
                            <p className="text-gray-700">
                                Assessment refers to the process of gathering
                                information and making judgments or evaluations
                                about an individuals performance, knowledge,
                                skills, abilities, or other characteristics. In
                                an educational context, assessment is used to
                                measure a students learning progress,
                                understanding of a subject, and attainment of
                                specific goals or objectives
                            </p>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};

export default HorizontalTabs;
