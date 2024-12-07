"use client";

import { Button, Card, Badge, Accordion, AccordionItem, Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

// Wrapper for Listbox component
export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function Project() {
  const items = [
    { key: "idea 1", label: "Idea A" },
    { key: "idea 2", label: "Idea B" },
    { key: "idea 3", label: "Idea C" },
    { key: "idea 4", label: "Idea D" },
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#000000", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: 0 }}>Project Name</h1>
        <Link href="/project/create">
          <Button color="primary">Back to Project</Button>
        </Link>
      </header>

      {/* Metadata Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Badge variant="flat">Category: Children’s Book</Badge>
        <Badge variant="flat">Genre: Fiction</Badge>
        <Badge variant="flat">Deadline: Dec 15, 2023</Badge>
        <Badge variant="flat">Recently Updated</Badge>
      </section>

      {/* Description */}
      <section style={{ marginBottom: "40px" }}>
        <h3>Description</h3>
        <p>Some description about the project.</p>
      </section>

      {/* Chapters Section */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0 }}>Chapters</h3>
          <Button size="sm" color="secondary">
            Create New Chapter
          </Button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4].map((chapter) => (
            <Card
              key={chapter}
              isHoverable
              isPressable
              style={{
                width: "180px",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "18px" }}>Chapter {chapter}</h4>
              <h4 style={{ marginTop: "10px", fontSize: "14px", color: "#888" }}>Text about the chapter...</h4>
            </Card>
          ))}
        </div>
      </section>

      {/* Outline Section */}
      <section style={{ marginBottom: "40px" }}>
        <Accordion>
          <AccordionItem key="outline" aria-label="Outline" title="Outline">
            <div style={{ padding: "10px" }}>
              <p>
                This section contains a detailed outline of the project. You can write long-form descriptions or plans
                here.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem key="ideas" aria-label="Ideas" title="Ideas">
            <div style={{ padding: "10px" }}>
              <ListboxWrapper>
                <Listbox aria-label="Ideas List" items={items}>
                  {(item) => (
                    <ListboxItem
                      key={item.key}
                      className={item.key === "delete" ? "text-danger" : ""}
                      color={item.key === "delete" ? "danger" : "default"}
                    >
                      {item.label}
                    </ListboxItem>
                  )}
                </Listbox>
              </ListboxWrapper>
            </div>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Link to Dashboard */}
      <footer style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Link href="/dashboard">
          <Button color="primary" size="lg">
            Submit
          </Button>
        </Link>
      </footer>
    </div>
  );
}
