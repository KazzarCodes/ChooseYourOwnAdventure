SET IDENTITY_INSERT [dbo].[Decision] ON
GO
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (1, 'Are you hungry?', 2, 3, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (2, 'Do you enjoy eating lobster?', 4, 5, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (3, 'Come back when you are hungry.', 0, 0, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (4, 'Can you cook lobster?', 6, 7, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (5, 'Are you sick?', 8, 9, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (6, 'Go cook some lobster.', 0, 0, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (7, 'Go to a restaurant.', 0, 0, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (8, 'Get some rest.', 0, 0, NULL)
INSERT INTO [dbo].[Decision] ([Id], [Title], [ResultTrueId], [ResultFalseId], [Result]) VALUES (9, 'Go eat lobster.', 0, 0, NULL)
SET IDENTITY_INSERT [dbo].[Decision] OFF
GO