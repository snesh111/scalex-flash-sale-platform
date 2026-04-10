import { joinQueue, getPosition } from "../services/queueService.js";

export const join = async (req, res) => {
  const { userId } = req.body;
  const position = await joinQueue(userId);

  res.json({
    status: "queued",
    position,
  });
};

export const position = async (req, res) => {
  const { userId } = req.params;
  const pos = await getPosition(userId);

  res.json({ position: pos });
};