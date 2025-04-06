import { createMocks } from "node-mocks-http";
import handler from "../app/api/compare_text/[json]/route"; // Adjust import

describe("POST /api/compare/[json]", () => {
  it("returns a valid comparison result", async () => {
    const input = {
      comp1: "Small modern kitchen with island",
      comp2: "Large rustic kitchen",
      ideal: "Modern kitchen with lots of space",
    };

    const { req, res } = createMocks({
      method: "GET",
      query: { json: JSON.stringify(input) },
    });

    await handler(req, res);

    const result = JSON.parse(res._getData());

    expect(result.description1.scoreAgainstIdeal).toBeGreaterThanOrEqual(1);
    expect(result.description2.scoreAgainstIdeal).toBeGreaterThanOrEqual(1);
    expect(result.comparison.similarityRating).toBeGreaterThanOrEqual(1);
    expect(result.comparison.jaccard).toBeDefined();
    expect(result.comparison.numberScore).toBeDefined();
  });

  it("handles missing fields gracefully", async () => {
    const input = {
      comp1: "Small kitchen",
      comp2: "",
      ideal: "Modern kitchen with lots of space",
    };

    const { req, res } = createMocks({
      method: "GET",
      query: { json: JSON.stringify(input) },
    });

    await handler(req, res);

    const result = JSON.parse(res._getData());

    expect(result.error).toBe("Missing fields");
  });
});
