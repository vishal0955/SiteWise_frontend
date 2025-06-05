import React, { useState, useEffect, useRef } from "react";
import "./Kanban.css";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";


const Kanban = () => {


    const { tasks, loading, error } = useSelector((state) => state.task);
    console.log(tasks)
  const [draggedCard, setDraggedCard] = useState(null);
  const kanbanContainerRef = useRef(null);
  const scrollLeftBtnRef = useRef(null);
  const scrollRightBtnRef = useRef(null);

  // Handle drag start
  const handleDragStart = (event) => {
    setDraggedCard(event.target);
    event.dataTransfer.setData("text/plain", event.target.id);

    // Add dragging class for visual feedback
    setTimeout(() => {
      event.target.classList.add("dragging");
    }, 0);
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over-highlight");
  };

  // Handle drag leave
  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("drag-over-highlight");
  };

  // Handle drop
  const handleDrop = (event, columnId) => {
    event.preventDefault();

    // Remove highlight
    event.currentTarget.classList.remove("drag-over-highlight");

    // Get the card ID
    const cardId = event.dataTransfer.getData("text/plain");
    const card = document.getElementById(cardId);

    // Only proceed if we found a card
    if (card) {
      // Remove dragging class
      card.classList.remove("dragging");

      // Append card to new column
      event.currentTarget.appendChild(card);

      // Update counters after moving cards
      updateCounters();

      // Add animation class to show it was dropped
      card.classList.add("bg-light");
      setTimeout(() => {
        card.classList.remove("bg-light");
      }, 300);
    }
  };

  // Update all column counters
  const updateCounters = () => {
    const columns = [
      "ongoing",
      "pending",
      "completed",
      "booked-column",
      "noshow-column",
      "sold-column",
      "didntbuy-column",
    ];

    columns.forEach((columnId) => {
      const column = document.getElementById(columnId);
      if (!column) return;

      const cards = column.querySelectorAll(".crm-prospect-card").length;

      // Find the counter for this column
      const columnTitle = column.parentElement.querySelector(".crm-tab");
      const counter = columnTitle?.querySelector(".stage-counter");

      // Update the counter
      if (counter) {
        counter.textContent = cards;
      }
    });
  };

  // Horizontal scrolling with buttons
  const scrollLeft = () => {
    if (kanbanContainerRef.current) {
      kanbanContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (kanbanContainerRef.current) {
      kanbanContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (
      !kanbanContainerRef.current ||
      !scrollLeftBtnRef.current ||
      !scrollRightBtnRef.current
    )
      return;

    // Enable both buttons by default
    scrollLeftBtnRef.current.disabled = false;
    scrollRightBtnRef.current.disabled = false;

    // Check if at left edge
    if (kanbanContainerRef.current.scrollLeft <= 0) {
      scrollLeftBtnRef.current.disabled = true;
    }

    // Check if at right edge
    if (
      kanbanContainerRef.current.scrollLeft +
        kanbanContainerRef.current.clientWidth >=
      kanbanContainerRef.current.scrollWidth
    ) {
      scrollRightBtnRef.current.disabled = true;
    }
  };

  useEffect(() => {
    // Initial update of counters
    updateCounters();

    // Initial check to enable/disable buttons
    if (
      kanbanContainerRef.current &&
      kanbanContainerRef.current.scrollLeft <= 0
    ) {
      if (scrollLeftBtnRef.current) {
        scrollLeftBtnRef.current.disabled = true;
      }
    }
  }, []);

  return (
    <>
      <div
        className="crm-prospects-container"
        style={{ height: "100%", overflowY: "hidden" }}
      >
        {/* Header */}
        <div className="crm-header d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
          <div className="crm-title mb-2 mb-md-0">Tasks</div>
          <div className="crm-header-buttons d-flex flex-wrap gap-2 justify-content-center">
            <button
              ref={scrollLeftBtnRef}
              id="scroll-left-btn"
              className="btn btn-primary border btn-sm"
              onClick={scrollLeft}
            >
              <ChevronLeft />
            </button>
            <button
              ref={scrollRightBtnRef}
              id="scroll-right-btn"
              className="btn btn-light border btn-sm"
              onClick={scrollRight}
            >
             <ChevronRight />
            </button>
            {/* <button
              className="btn btn-primary btn-sm text-white"
              style={{ backgroundColor: "#337ab7" }}
            >
              <i className="bi bi-gear" /> Settings
            </button> */}
            <Link to="/create-task">
              <button
                className="btn btn-success btn-sm text-white"
                style={{ backgroundColor: "#337ab7" }}
              >
                <i className="bi bi-plus" /> Add Task
              </button>
            </Link>
          </div>
        </div>

        <div
          id="kanban-container"
          ref={kanbanContainerRef}
          className="row flex-nowrap"
          style={{ overflowX: "auto", scrollBehavior: "smooth" }}
          onScroll={handleScroll}
        >
          {/* First Column - Search and Filters */}
          {/* <div className="col-md-3">
            <div className="crm-tab fw-semibold d-flex justify-content-between mb-2">
              Search
              <a href="#" className="crm-hide-link fw-normal">
                Hide
              </a>
            </div>
            <div
              style={{
                height: "60%",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              <div className="crm-search-panel border">
                <div className="crm-filter-row">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search Prospects"
                    />
                    <button
                      className="btn btn-light border btn-sm"
                      type="button"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="crm-filter-row">
                  <label className="form-label small mb-1">
                    All Stages (7)
                  </label>
                  <select className="form-select form-select-sm">
                    <option>All Stages</option>
                  </select>
                </div>
                <div className="crm-filter-row">
                  <label className="form-label small mb-1">
                    Sales Representative
                  </label>
                  <select className="form-select form-select-sm">
                    <option>All</option>
                    <option value="unassigned" title="">
                      Unassigned
                    </option>
                    <option value={502860} title="">
                      Aira Fitness Foxlake Staff
                    </option>
                    <option value={160} title="">
                      Alyssa Kathan
                    </option>
                    <option value={155} title="">
                      Ashley .
                    </option>
                    <option value={502886} title="">
                      Jasmine Crago
                    </option>
                    <option value={12} title="">
                      Mike Bell
                    </option>
                    <option value={502970} title="">
                      Samantha Ricardo
                    </option>
                  </select>
                </div>
                <div className="crm-filter-row">
                  <label className="form-label small mb-1">
                    Last Contacted Since
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="crm-filter-row">
                  <label className="form-label small mb-1">Tags</label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="showSnoozed"
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="showSnoozed"
                  >
                    Show snoozed prospects (0)
                  </label>
                </div>
              </div>
      
              <div className="crm-funnel-view">
                <div className="crm-funnel-header">Prospect Funnel</div>
                <div className="small mb-2">Show Stacked View</div>
                <div className="crm-funnel-section crm-funnel-uncontacted">
                  Uncontacted (135)
                </div>
                <div className="crm-funnel-section crm-funnel-contacted">
                  Contacted (No Answer) (1)
                </div>
                <div className="crm-funnel-section crm-funnel-followup">
                  Follow Up (0)
                </div>
                <div className="crm-funnel-section crm-funnel-booked">
                  Booked APPT (0)
                </div>
                <div className="crm-funnel-section crm-funnel-noshow">
                  No Show (0)
                </div>
                <div className="crm-funnel-section crm-funnel-sold">
                  SOLD (0)
                </div>
                <div className="crm-funnel-section crm-funnel-didntbuy">
                  Didn't Buy (0)
                </div>
              </div>
            </div>
          </div> */}
          {/* Second Column - Uncontacted Prospects */}
          <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2">
              On-Going  <span className="stage-counter"></span>
            </div>
            {/* Prospect Cards */}
            <div
              id="ongoing"
              className="px-3 kanban-column"
              style={{
                borderLeft: "1px solid lightgray",
                borderRight: "1px solid lightgray",
                height: "60%",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "ongoing")}
              onDragLeave={handleDragLeave}
            >
              <div
                className="crm-prospect-card"
                draggable="true"
                onDragStart={handleDragStart}
                id="prospect-1"
              >
                <div className="d-flex justify-content-between">
                  <div className="crm-prospect-name">John Doe</div>
                  {/* <small>Alyssa Kathan</small> */}
                </div>
                <div className="crm-prospect-info">
                  <div className="crm-prospect-details">
                   Task Name
                  </div>
                  <div className="d-flex gap-1">
                    <button className="crm-action-btn">Actions</button>
                    
                  </div>
                </div>
              </div>
            
              
            </div>
          </div>
          {/* Third Column - Contacted (No Answer) */}
          <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2">
           Pending<span className="stage-counter">1</span>
            </div>
            <div
              id="pending"
              className="pe-3 kanban-column"
              style={{ borderRight: "1px solid lightgray", height: "70%" }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "pending")}
              onDragLeave={handleDragLeave}
            >
              <div
                className="crm-prospect-card"
                draggable="true"
                onDragStart={handleDragStart}
                id="prospect-12"
              >
                <div className="d-flex justify-content-between">
                  <div className="crm-prospect-name">Mark Metzger</div>
                  <small>Alyssa Kathan</small>
                </div>
                <div className="crm-prospect-info">
                  <div className="crm-prospect-details">
                    Emailed 112 days ago
                  </div>
                  <div className="d-flex gap-1">
                    <button className="crm-action-btn">Actions</button>
                    <button className="crm-heart-btn">
                      <i className="bi bi-alarm" />
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          {/* Fourth Column - Follow Up */}
          <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2">
              Completed <span className="stage-counter">0</span>
            </div>
            <div
              id="completed"
              className="kanban-column"
              style={{ borderRight: "1px solid lightgray", height: "70%" }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "completed")}
              onDragLeave={handleDragLeave}
            ></div>
          </div>
          {/* Fifth Column - Booked APPT */}
          <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2 ps-3">
             Delayed <span className="stage-counter">0</span>
            </div>
            <div
              id="booked-column"
              className="ps-3 kanban-column"
              style={{
                borderLeft: "1px solid lightgray",
                borderRight: "1px solid lightgray",
                height: "70%",
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "booked-column")}
              onDragLeave={handleDragLeave}
            ></div>
          </div>
          {/* Sixth Column - No Show */}
          {/* <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2">
              No Show <span className="stage-counter">0</span>
            </div>
            <div
              id="noshow-column"
              className="kanban-column"
              style={{ borderRight: "1px solid lightgray", height: "70%" }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "noshow-column")}
              onDragLeave={handleDragLeave}
            ></div>
          </div> */}
          {/* Seventh Column - SOLD */}
          {/* <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2">
              SOLD <span className="stage-counter">0</span>
            </div>
            <div
              id="sold-column"
              className="kanban-column"
              style={{ borderRight: "1px solid lightgray", height: "70%" }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "sold-column")}
              onDragLeave={handleDragLeave}
            ></div>
          </div> */}
          {/* Eighth Column - Didn't Buy */}
          {/* <div className="col-md-3">
            <div className="crm-tab fw-semibold mb-2">
              Didn't Buy <span className="stage-counter">0</span>
            </div>
            <div
              id="didntbuy-column"
              className="kanban-column"
              style={{ borderRight: "1px solid lightgray", height: "70%" }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "didntbuy-column")}
              onDragLeave={handleDragLeave}
            ></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Kanban;
