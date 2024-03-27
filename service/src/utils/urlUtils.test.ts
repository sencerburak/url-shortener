import { calculateTtl, generateShortUrl, getUrlWithProtocol } from "./urlUtils";

describe("calculateTtl", () => {
  it("should return the correct TTL value in seconds", () => {
    const days = 90;
    const expectedTtl = Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
    const ttl = calculateTtl(days);
    expect(ttl).toBe(expectedTtl);
  });

  it("should return the correct TTL value in seconds when days is not provided", () => {
    const expectedTtl = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60;
    const ttl = calculateTtl();
    expect(ttl).toBe(expectedTtl);
  });
});

describe("generateShortUrl", () => {
  it("should generate a short URL with length 7", () => {
    const shortUrl = generateShortUrl();
    expect(shortUrl.length).toBe(7);
  });
});

describe("getUrlWithProtocol", () => {
  it("should add 'http://' to a URL without a protocol", () => {
    const url = "example.com";
    const expectedUrl = "http://example.com";
    const urlWithProtocol = getUrlWithProtocol(url);
    expect(urlWithProtocol).toBe(expectedUrl);
  });

  it("should not modify a URL with 'http://' protocol", () => {
    const url = "http://example.com";
    const urlWithProtocol = getUrlWithProtocol(url);
    expect(urlWithProtocol).toBe(url);
  });

  it("should not modify a URL with 'https://' protocol", () => {
    const url = "https://example.com";
    const urlWithProtocol = getUrlWithProtocol(url);
    expect(urlWithProtocol).toBe(url);
  });
});
