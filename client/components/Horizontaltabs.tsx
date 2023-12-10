// components/HorizontalTabs.tsx
// @react-client
'use client'
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from 'react';

const HorizontalTabs = () => {
  const [selected, setSelected] = React.useState("photos");

  return (
    <div className="w-full mx-auto p-8">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        align="center"
        className="bg-gray-200 rounded-lg p-4"
      >
        <Tab key="photos" title="Tab 1">
          <Card>
            <CardHeader className="text-lg font-semibold">Tab 1</CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Tab 2">
          <Card>
            <CardHeader className="text-lg font-semibold">Tab 2</CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Tab 3">
          <Card>
            <CardHeader className="text-lg font-semibold">Tab 3</CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default HorizontalTabs;
