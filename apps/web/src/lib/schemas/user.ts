import { z, type Infer } from "@planria/util/zod";

/**
 * Represents the schema for a user session.
 */
export const userSessionSchema = z.object({
  organisationId: z.string().min(1).nullable().optional(),
  userRole: z.string().min(1).nullable().optional(),
  userId: z.string().min(1).nullable().optional(),
  userPermissionsInOrganisation: z.array(z.string()).nullable().optional(),
  hasPermission: z.function().args(z.string()).returns(z.boolean()),
  redirectUserToSignIn: z.function().returns(z.void()),
  token: z.string().min(1).nullable(),
});

export type UserSession = Infer<typeof userSessionSchema>;

/**
 * Represents the schema for a user object.
 */
export const userSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email().min(1).optional(),
  firstName: z.string().min(1).nullable(),
  lastName: z.string().min(1).nullable(),
  username: z.string().min(1).nullable(),
  fullName: z.string().min(1).nullable(),
  avatarURL: z.string().min(1).nullable(),
  hasAvatar: z.boolean(),
  hasVerifiedPhoneNumber: z.boolean(),
  hasVerifiedEmailAddress: z.boolean(),
  lastSignInAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime().nullable(),
});

/**
 * Represents a user object.
 */
export type User = Infer<typeof userSchema>;
