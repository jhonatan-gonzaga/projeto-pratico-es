export const contractInclude = {
  client: { include: { user: { select: { id: true, name: true, phone: true, avatarUrl: true } } } },
  professional: {
    include: {
      user: { select: { id: true, name: true, phone: true, avatarUrl: true } },
      specialties: { include: { category: true } },
    },
  },
  ad: { include: { category: true, images: true } },
  application: true,
  directRequest: { include: { images: true } },
  statusHistory: { orderBy: { createdAt: 'desc' as const } },
  conversations: {
    include: {
      messages: {
        include: { sender: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' as const },
        take: 1,
      },
    },
  },
  review: true,
};
