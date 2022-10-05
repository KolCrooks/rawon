import { inVC, sameVC, validVC } from "../../utils/decorators/MusicUtil";
import { CommandContext } from "../../structures/CommandContext";
import { createEmbed } from "../../utils/functions/createEmbed";
import { BaseCommand } from "../../structures/BaseCommand";
import { Command } from "../../utils/decorators/Command";
import i18n from "../../config";

@Command({
    aliases: ["clean"],
    description: i18n.__("commands.music.stop.description"),
    name: "clean",
    slash: {
        options: []
    },
    usage: "{prefix}clean"
})
export class CleanCommand extends BaseCommand {
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
