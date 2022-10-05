import { inVC, sameVC, validVC } from "../../utils/decorators/MusicUtil";
import { CommandContext } from "../../structures/CommandContext";
import { createEmbed } from "../../utils/functions/createEmbed";
import { BaseCommand } from "../../structures/BaseCommand";
import { Command } from "../../utils/decorators/Command";
import i18n from "../../config";
import { memberReqPerms } from "../../utils/decorators/CommonUtil.js";

@Command({
    aliases: [],
    description: "CLEANNNNNN",
    name: "clean",
    slash: {
        options: []
    },
    usage: "{prefix}clean"
})
export class CleanCommand extends BaseCommand {
    @memberReqPerms(["MANAGE_MESSAGES"], i18n.__("commands.moderation.warn.userNoPermission"))
    public async execute(ctx: CommandContext): Promise<void> {
        const msgs = await ctx.channel?.messages.fetch({limit: 100});
        if (!msgs) {
            ctx.reply("No messages found");
            return;
        }
        let deleted = 0;
        for (const kv of msgs) {
            let msg = kv[1];
            if (msg.author.id == this.client.user?.id || msg.content.startsWith(this.client.config.mainPrefix) || msg.applicationId == this.client.application?.id) {
                msg.delete();
                deleted++;
            }
        }
        const handle = await ctx.reply(`Cleaned ${deleted} messages.`);
        setTimeout(()=> {
            handle.delete();
        }, 5000);
    }
}
