import { itemsMenu } from "@ui/constants/items-menu";
import { WhatsappIcon } from "@ui/whatsapp-icons";
import Link from "next/link";

export async function PublicNavBar() {
    return (
        <nav className="bg-surface fixed w-full z-20 top-0 left-0 border-b border-surface-muted shadow-sm">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 text-foreground font-semibold hover:opacity-90 transition-opacity">
                    <WhatsappIcon />
                    <span>Whatsapp Agent</span>
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-muted rounded-lg md:hidden hover:bg-surface-soft hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-surface-muted rounded-lg bg-surface-soft md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-foreground rounded md:bg-transparent md:text-accent md:p-0 hover:text-accent-strong transition-colors"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        {itemsMenu.map((iten, i) => (
                            <li key={i}>
                                <Link
                                    href={iten.href}
                                    className="block py-2 px-3 text-foreground rounded md:bg-transparent md:text-accent md:p-0 hover:text-accent-strong transition-colors"
                                    aria-current="page"
                                >
                                    {iten.textNode}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}