import { describe, expect, it } from "vitest";
import { accommodationGalleryImages, accommodationSectionCopy, activities, activitiesGalleryImages, activitiesSectionCopy, getActivitiesForDate, locales, miniClubGalleryImages, miniClubSectionCopy, miniClubWeekDays, miniClubWeekSchedule, restaurantBarGalleryImages, restaurantBarSectionCopy, restaurantBarVenues, roomOptions, spaGalleryImages, spaSectionCopy } from "./content";

describe("shared guest activity calendar data", () => {
  it("returns the same records used by the landing-page schedule", () => {
    const august26 = getActivitiesForDate("2026-08-26");

    expect(august26).toHaveLength(6);
    expect(august26.map((activity) => activity.id)).toEqual(
      activities.filter((activity) => activity.date === "2026-08-26").map((activity) => activity.id),
    );
  });

  it("returns an empty count for a date with no listed activities", () => {
    expect(getActivitiesForDate("2026-09-01")).toEqual([]);
  });

  it("starts the Lotus Activities carousel on Yoga", () => {
    expect(activitiesGalleryImages).toHaveLength(7);
    expect(activitiesGalleryImages[0]).toContain("Yoga-2_1200x800.jpg");
  });

  it("provides complete localized Lotus Activities copy", () => {
    for (const locale of locales.map(({ code }) => code)) {
      expect(activitiesSectionCopy.eyebrow[locale]).toBeTruthy();
      expect(activitiesSectionCopy.title[locale]).toBeTruthy();
      expect(activitiesSectionCopy.description[locale]).toBeTruthy();
    }
  });

  it("starts the SPA carousel on the requested spa5 image", () => {
    expect(spaGalleryImages).toHaveLength(8);
    expect(spaGalleryImages[0]).toBe("https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/spa5.jpg");
  });

  it("provides complete localized SPA copy and service descriptions", () => {
    for (const locale of locales.map(({ code }) => code)) {
      expect(spaSectionCopy.eyebrow[locale]).toBeTruthy();
      expect(spaSectionCopy.title[locale]).toBeTruthy();
      expect(spaSectionCopy.description[locale]).toBeTruthy();
      expect(spaSectionCopy.photosLabel[locale]).toBeTruthy();
      expect(spaSectionCopy.services).toHaveLength(3);
      for (const service of spaSectionCopy.services) {
        expect(service.title[locale]).toBeTruthy();
        expect(service.description[locale]).toBeTruthy();
      }
    }
  });

  it("keeps the Restaurant & Bar image set and venue data complete without legacy logos", () => {
    expect(restaurantBarGalleryImages).toHaveLength(12);
    expect(restaurantBarGalleryImages.some((image) => /logo(_sub)?\.png/i.test(image))).toBe(false);
    expect(restaurantBarGalleryImages[0]).toContain("Blue-Bar-5_1200x800-800x533.jpg");
    expect(restaurantBarVenues.restaurants).toHaveLength(6);
    expect(restaurantBarVenues.bars).toHaveLength(9);
  });

  it("provides localized Restaurant & Bar labels and gastronomy copy", () => {
    for (const locale of locales.map(({ code }) => code)) {
      expect(restaurantBarSectionCopy.eyebrow[locale]).toBeTruthy();
      expect(restaurantBarSectionCopy.title[locale]).toBeTruthy();
      expect(restaurantBarSectionCopy.description[locale]).toBeTruthy();
      expect(restaurantBarSectionCopy.restaurantsLabel[locale]).toBeTruthy();
      expect(restaurantBarSectionCopy.barsLabel[locale]).toBeTruthy();
      expect(restaurantBarSectionCopy.photosLabel[locale]).toBeTruthy();
      expect(restaurantBarSectionCopy.booking[locale]).toBeTruthy();
    }
  });

  it("keeps the Accommodation gallery and room catalog complete", () => {
    expect(accommodationGalleryImages).toHaveLength(14);
    expect(roomOptions).toHaveLength(9);
    expect(roomOptions[0].name.en).toContain("Economy");
    expect(roomOptions[8].name.en).toContain("Jacuzzi");
  });

  it("provides localized Accommodation copy and room metadata", () => {
    for (const locale of locales.map(({ code }) => code)) {
      expect(accommodationSectionCopy.eyebrow[locale]).toBeTruthy();
      expect(accommodationSectionCopy.title[locale]).toBeTruthy();
      expect(accommodationSectionCopy.description[locale]).toBeTruthy();
      expect(accommodationSectionCopy.roomsLabel[locale]).toBeTruthy();
      for (const room of roomOptions) {
        expect(room.name[locale]).toBeTruthy();
        expect(room.beds[locale]).toBeTruthy();
        expect(room.size).toBeTruthy();
        expect(room.guests).toBeGreaterThan(0);
        expect(room.bath).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the Mini Club gallery and weekly schedule complete without legacy logos", () => {
    expect(miniClubGalleryImages).toHaveLength(5);
    expect(miniClubGalleryImages.some((image) => /logo(_sub)?\.png/i.test(image))).toBe(false);
    expect(miniClubWeekSchedule).toHaveLength(28);
    expect(new Set(miniClubWeekSchedule.map((item) => item.dayIndex))).toEqual(new Set([0, 1, 2, 3, 4, 5, 6]));
    for (const day of miniClubWeekDays.en) expect(day).toBeTruthy();
  });

  it("provides localized Mini Club copy and schedule activities", () => {
    for (const locale of locales.map(({ code }) => code)) {
      expect(miniClubSectionCopy.eyebrow[locale]).toBeTruthy();
      expect(miniClubSectionCopy.title[locale]).toBeTruthy();
      expect(miniClubSectionCopy.description[locale]).toBeTruthy();
      expect(miniClubSectionCopy.age[locale]).toBeTruthy();
      expect(miniClubSectionCopy.supervisors[locale]).toBeTruthy();
      expect(miniClubSectionCopy.aboutTitle[locale]).toBeTruthy();
      expect(miniClubSectionCopy.aboutDescription[locale]).toBeTruthy();
      expect(miniClubSectionCopy.scheduleTitle[locale]).toBeTruthy();
      expect(miniClubSectionCopy.features.every((feature) => Boolean(feature[locale]))).toBe(true);
      expect(miniClubWeekDays[locale]).toHaveLength(7);
      expect(miniClubWeekSchedule.every((item) => Boolean(item.title[locale]))).toBe(true);
    }
  });
});
