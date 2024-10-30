// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import EditiorNavbar from "../components/EditiorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";

const Editior = () => {
  // State variables
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const { projectID } = useParams();

  // Handle window resize event
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1000);
  };

  // Effect for handling window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Save project function
  const saveProject = () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !projectID) return;

    fetch(api_base_url + "/updateProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        projId: projectID,
        htmlCode,
        cssCode,
        jsCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Project saved successfully!");
          window.location.reload();
        } else {
          alert("Failed to save project!");
        }
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        alert("An error occurred while saving the project.");
      });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        saveProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [htmlCode, cssCode, jsCode, projectID]);

  // Change theme function
  const changeTheme = () => {
    const editorNavbar = document.querySelector(".EditiorNavbar");
    const proTitle = document.querySelector(".proTitle");
    const logoImg = document.querySelector(".logoImg");
    if (isLightMode) {
      editorNavbar.style.background = "#141414bd";
      proTitle.style.color = "#ffffff94";
      logoImg.style.filter = "invert(0%)";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      editorNavbar.style.background = "#f4f4f4cb";
      proTitle.style.color = "#000000c6";
      logoImg.style.filter = "invert(100%)";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  // Run code function
  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;

    if (isOutputVisible) {
      const iframe = document.getElementById("iframe");
      if (iframe) {
        iframe.srcdoc = `${html}${css}${js}`; // Combine HTML, CSS, and JS
      }
    }
  };

  // Effect to run code when relevant state changes
  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode, isOutputVisible]);

  // Fetch project data
  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      });
  }, [projectID]);

  const handleEditorDidMount = (editor, monaco) => {
    emmetHTML(monaco);
    emmetCSS(monaco);
  };

  const editorOptions = {
    scrollBeyondLastLine: false,
    readOnly: false,
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true,
    },
    suggestOnTriggerCharacters: true,
    snippetSuggestions: "inline", // Ensure snippets appear inline
    tabCompletion: "on", // Enable Tab key for completion
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    formatOnType: true, // Automatically format code while typing
  };

  return (
    <>
      <EditiorNavbar projectID={projectID} />
      <div className={`resEditor ${isOutputVisible ? "hidden" : "block"}`}>
        <div className={`editor-container ${isMobile ? "w-full" : "w-1/2"} flex flex-col h-full`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => setTab("html")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E]"
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E]"
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E]"
              >
                JavaScript
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme}>
                <MdLightMode />
              </i>
            </div>
          </div>

          {/* Editor Component */}
          {tab === "html" ? (
            <Editor
              onChange={(value) => {
                setHtmlCode(value || "");
                run();
              }}
              height="calc(100vh - 120px)" // Adjust height for navbar and footer
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
              onMount={handleEditorDidMount}
              options={editorOptions}
              className="no-scroll"
            />
          ) : tab === "css" ? (
            <Editor
              onChange={(value) => {
                setCssCode(value || "");
                run();
              }}
              height="calc(100vh - 120px)"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
              onMount={handleEditorDidMount}
              options={editorOptions}
              className="no-scroll"
            />
          ) : (
            <Editor
              onChange={(value) => {
                setJsCode(value || "");
                run();
              }}
              height="calc(100vh - 120px)"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
              className="no-scroll"
            />
          )}

          {/* Footer for mobile layout */}
          <footer className="footer bg-gray-800 text-white p-2">
            <button
              className="output-button"
              onClick={() => {
                setIsOutputVisible(true);
                run();
              }}
            >
              Show Output
            </button>
          </footer>
        </div>
      </div>

      {/* Output section that appears on button click */}
      {isOutputVisible && (
        <div className="output-container absolute top-0 left-0 w-full h-full">
          <iframe
            id="iframe"
            className="w-full h-full bg-[#fff] text-black"
            title="output"
          />
          {/* Footer for output */}
          <footer className="footer bg-gray-800 text-white p-2">
            <button
              className="back-button"
              onClick={() => setIsOutputVisible(false)}
            >
              Back to Editor
            </button>
          </footer>
        </div>
      )}
    </>
  );
};

export default Editior;
