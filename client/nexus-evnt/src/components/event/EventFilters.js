import React from "react";
import { Form } from "react-bootstrap";

const EventFilters = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <div>
      <h5 className="fs-2">Filters</h5>
      <Form>
        {/* Price Filters */}
        <Form.Group>
          <Form.Label className="mt-3 fw-semibold">Price</Form.Label>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label="Free"
            checked={filters.price.free}
            onChange={(e) =>
              handleCheckboxChange("price", { free: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Paid"
            checked={filters.price.paid}
            onChange={(e) =>
              handleCheckboxChange("price", { paid: e.target.checked })
            }
          />
        </Form.Group>
        <hr />

        {/* Date Filters */}
        <Form.Group>
          <Form.Label className="mt-3 fw-semibold">Date</Form.Label>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label="Today"
            checked={filters.date.today}
            onChange={(e) =>
              handleCheckboxChange("date", { today: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Tomorrow"
            checked={filters.date.tomorrow}
            onChange={(e) =>
              handleCheckboxChange("date", { tomorrow: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="This Week"
            checked={filters.date.thisWeek}
            onChange={(e) =>
              handleCheckboxChange("date", { thisWeek: e.target.checked })
            }
          />
        </Form.Group>
        <hr />

        {/* Category Filters */}
        <Form.Group>
          <Form.Label className="mt-3 fw-semibold">Category</Form.Label>
          {[
            "Color Runs",
            "Food and Drink Festival",
            "Music Festival",
            "Carnival and Fairs",
            "Outdoor Movie Nights",
            "Art and Craft Fair",
          ].map((category) => (
            <Form.Check
              key={category}
              className="mt-2"
              type="checkbox"
              label={category}
              checked={filters.category[category] || false}
              onChange={(e) =>
                handleCheckboxChange("category", {
                  [category]: e.target.checked,
                })
              }
            />
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default EventFilters;
