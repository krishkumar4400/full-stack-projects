import argon2 from "argon2";

export async function hashPassword(password) {
  return argon2.hash(password, {
    type: argon2.argon2id, // best variant
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3, // iterations
    parallelism: 1,
  });
}

