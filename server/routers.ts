import { COOKIE_NAME } from "@shared/const";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createGuestAsset, listGuestAssets, listPublishedGuestAssets } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { getLiveMarmarisDate } from "./services/timeService";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  time: router({
    liveDate: publicProcedure.query(() => getLiveMarmarisDate()),
  }),
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  assets: router({
    published: publicProcedure.query(() => listPublishedGuestAssets()),
    list: adminProcedure.query(() => listGuestAssets()),
    upload: adminProcedure
      .input(z.object({
        fileName: z.string().min(1).max(255),
        contentType: z.string().regex(/^image\/(jpeg|png|webp|gif)$/),
        sizeBytes: z.number().int().positive().max(8 * 1024 * 1024),
        label: z.string().max(160).optional(),
        published: z.boolean().default(false),
        dataBase64: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        const bytes = Buffer.from(input.dataBase64, "base64");
        if (bytes.length !== input.sizeBytes) {
          throw new Error("Uploaded file size did not match the request");
        }
        const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
        const uploaded = await storagePut(`hotel-assets/${nanoid(12)}-${safeName}`, bytes, input.contentType);
        return createGuestAsset({
          createdByUserId: ctx.user.id,
          fileName: input.fileName,
          storageKey: uploaded.key,
          url: uploaded.url,
          contentType: input.contentType,
          sizeBytes: input.sizeBytes,
          label: input.label ?? null,
          published: input.published,
        });
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
